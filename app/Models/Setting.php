<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'val', 'type'];

    /**
     * Add a settings value
     *
     * @param string $key
     * @param mixed $val
     * @param string $type
     * @return mixed
     */
    public static function add(string $key, mixed $val, string $type = 'string'): mixed
    {
        if (self::has($key)) {
            return self::set($key, $val, $type);
        }

        $created = self::create(['name' => $key, 'val' => $val, 'type' => $type]);
        self::clearCache();
        
        return $created ? $val : false;
    }

    /**
     * Get a settings value
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        if (self::has($key)) {
            $setting = self::getAllSettings()->where('name', $key)->first();
            return self::castValue($setting->val, $setting->type);
        }

        return self::getDefaultValue($key, $default);
    }

    /**
     * Set a value for setting
     *
     * @param string $key
     * @param mixed $val
     * @param string $type
     * @return mixed
     */
    public static function set(string $key, mixed $val, string $type = 'string'): mixed
    {
        if ($setting = self::getAllSettings()->where('name', $key)->first()) {
            $updated = $setting->update([
                'name' => $key,
                'val' => $val,
                'type' => $type
            ]);
            self::clearCache();
            return $updated ? $val : false;
        }

        return self::add($key, $val, $type);
    }

    /**
     * Remove a setting
     *
     * @param string $key
     * @return bool
     */
    public static function remove(string $key): bool
    {
        if (self::has($key)) {
            $deleted = self::whereName($key)->delete();
            self::clearCache();
            return (bool) $deleted;
        }

        return false;
    }

    /**
     * Check if setting exists
     *
     * @param string $key
     * @return bool
     */
    public static function has(string $key): bool
    {
        return (bool) self::getAllSettings()->whereStrict('name', $key)->count();
    }

    /**
     * Get the validation rules for setting fields
     *
     * @return array
     */
    public static function getValidationRules(): array
    {
        return self::getDefinedSettingFields()->pluck('rules', 'name')
            ->reject(function ($val) {
                return is_null($val);
            })->toArray();
    }

    /**
     * Get the data type of a setting
     *
     * @param string $field
     * @return string
     */
    public static function getDataType(string $field): string
    {
        $type = self::getDefinedSettingFields()
            ->pluck('data', 'name')
            ->get($field);

        return is_null($type) ? 'string' : $type;
    }

    /**
     * Get default value for a setting
     *
     * @param string $field
     * @return mixed
     */
    public static function getDefaultValueForField(string $field): mixed
    {
        return self::getDefinedSettingFields()
            ->pluck('value', 'name')
            ->get($field);
    }

    /**
     * Get all settings with current values for frontend
     *
     * @return array
     */
    public static function getSettingsForFrontend(): array
    {
        $config = config('setting_fields', []);
        $currentSettings = self::getAllSettings()->pluck('val', 'name');

        foreach ($config as $sectionKey => &$section) {
            foreach ($section['elements'] as &$element) {
                $element['current_value'] = $currentSettings->get($element['name'], $element['value']);
            }
        }

        return $config;
    }


    public static function getSettingsKeyValueForFrontend(): array
    {
        $currentSettings = self::getAllSettings()->pluck('val', 'name');
        return $currentSettings->toArray();
    }

    /**
     * Get default value from config if no value passed
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    private static function getDefaultValue(string $key, mixed $default): mixed
    {
        return is_null($default) ? self::getDefaultValueForField($key) : $default;
    }

    /**
     * Get all the settings fields from config
     *
     * @return Collection
     */
    private static function getDefinedSettingFields(): Collection
    {
        return collect(config('setting_fields', []))->pluck('elements')->flatten(1);
    }

    /**
     * Cast value into respective type
     *
     * @param mixed $val
     * @param string $castTo
     * @return mixed
     */
    public static function castValue(mixed $val, string $castTo): mixed
    {
        return match ($castTo) {
            'int', 'integer', 'number' => (int) $val,
            'bool', 'boolean' => (bool) $val,
            'float', 'double' => (float) $val,
            'array' => is_array($val) ? $val : json_decode($val, true),
            default => $val,
        };
    }

    /**
     * Get all the settings with caching
     *
     * @return Collection
     */
    public static function getAllSettings(): Collection
    {
        return Cache::remember('settings', 3600, function () {
            return self::all();
        });
    }

    /**
     * Clear the settings cache
     *
     * @return void
     */
    public static function clearCache(): void
    {
        Cache::forget('settings');
    }
}
