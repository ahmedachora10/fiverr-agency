<?php

use App\Models\Setting;

if (! function_exists('setting')) {

    function setting($key, $default = null)
    {
        if (is_null($key)) {
            return new Setting();
        }

        if (is_array($key)) {
            return Setting::set($key[0], $key[1]);
        }

        $value = app('settings')->firstWhere('name', $key);

        return is_null($value) ? value($default) : Setting::castValue($value->val, $value->type);
    }
}