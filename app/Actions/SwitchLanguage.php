<?php

namespace App\Actions;

use Illuminate\Support\Facades\Session;

class SwitchLanguage
{
    public function __invoke(string $language)
    {
        if (!in_array($language, ['en', 'ar'])) {
            $language = 'en';
        }

        Session::put('locale', $language);

        app()->setLocale($language);

        return  redirect()->back();
    }
}

