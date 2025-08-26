<?php

return [
    'app' => [
        'title' => 'اعدادات عامة',
        'desc' => 'الإعدادات الأساسية للتطبيق',
        'icon' => 'mdi mdi-settings',
        'elements' => [
            [
                'type' => 'text',
                'data' => 'string',
                'name' => 'app_name',
                'label' => 'اسم الموقع',
                'rules' => 'nullable|min:2|max:50',
                'class' => '',
                'value' => ''
            ],
            [
                'type' => 'text',
                'data' => 'string',
                'name' => 'tagline',
                'label' => 'TagLine',
                'rules' => 'nullable|string',
                'class' => '',
                'value' => ''
            ],
            [
                'type' => 'text',
                'data' => 'string',
                'name' => 'description',
                'label' => 'Description',
                'rules' => 'nullable|string',
                'class' => '',
                'value' => ''
            ]
        ]
    ],

    'Contact Us' => [
        'title' => 'اتصل بنا',
        'desc' => 'معلومات الاتصال',
        'icon' => 'mdi mdi-contact-mail',
        'elements' => [
            [
                'type' => 'email',
                'data' => 'string',
                'name' => 'email',
                'label' => 'Email',
                'rules' => 'nullable|email',
                'class' => '',
                'value' => ''
            ],
            [
                'type' => 'text',
                'data' => 'string',
                'name' => 'phone',
                'label' => 'Phone',
                'rules' => 'nullable|string',
                'class' => '',
                'value' => ''
            ]
        ]
    ],

    'Social Media' => [
        'title' => 'مواقع التواصل الاجتماعية',
        'desc' => 'روابط وسائل التواصل الاجتماعي',
        'icon' => 'mdi mdi-account-card-details',
        'elements' => [
            [
                'type' => 'text',
                'data' => 'string',
                'name' => 'facebook',
                'label' => 'Facebook',
                'rules' => 'nullable|string',
                'class' => '',
                'value' => ''
            ],
            [
                'type' => 'text',
                'data' => 'string',
                'name' => 'twitter',
                'label' => 'Twitter',
                'rules' => 'nullable|string',
                'class' => '',
                'value' => ''
            ],
            [
                'type' => 'text',
                'data' => 'string',
                'name' => 'instagram',
                'label' => 'Instagram',
                'rules' => 'nullable|string',
                'class' => '',
                'value' => ''
            ],
            [
                'type' => 'text',
                'data' => 'string',
                'name' => 'telegram',
                'label' => 'Telegram',
                'rules' => 'nullable|string',
                'class' => '',
                'value' => ''
            ],
            [
                'type' => 'text',
                'data' => 'string',
                'name' => 'whatsapp',
                'label' => 'WhatsApp',
                'rules' => 'nullable|string',
                'class' => '',
                'value' => ''
            ],
        ]
    ],

    'Google Analytics' => [
        'title' => 'Google Analytics',
        'desc' => 'Google Analytics',
        'icon' => 'mdi mdi-google-analytics',
        'elements' => [
            [
                'type' => 'textarea',
                'data' => 'string',
                'name' => 'google_analytics',
                'label' => 'Google Analytics',
                'rules' => 'nullable|string',
                'class' => '',
                'value' => ''
            ],
        ]
    ],
];
