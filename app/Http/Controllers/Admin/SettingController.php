<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Display the settings page
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Settings', [
            'settingsConfig' => Setting::getSettingsForFrontend(),
            'currentSettings' => Setting::getAllSettings()->pluck('val', 'name'),
        ]);
    }

    /**
     * Store the settings
     */
    public function store(Request $request)
    {
        $rules = Setting::getValidationRules();
        $data = $request->validate($rules);

        $validSettings = array_keys($rules);

        foreach ($data as $key => $val) {
            if (in_array($key, $validSettings)) {
                Setting::set($key, $val, Setting::getDataType($key));
            }
        }

        Setting::clearCache();

        return back()->with('success', 'تم حفظ الاعدادات بنجاح');
    }

    /**
     * Get a specific setting value (API endpoint)
     */
    public function getSetting(string $key)
    {
        return response()->json([
            'value' => Setting::get($key),
        ]);
    }

    /**
     * Update a specific setting (API endpoint)
     */
    public function updateSetting(Request $request, string $key)
    {
        $rules = Setting::getValidationRules();
        
        if (!array_key_exists($key, $rules)) {
            return response()->json(['error' => 'Invalid setting key'], 400);
        }

        $request->validate([$key => $rules[$key]]);
        
        $value = Setting::set($key, $request->input($key), Setting::getDataType($key));

        return response()->json([
            'success' => true,
            'value' => $value,
        ]);
    }
}
