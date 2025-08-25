<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UploadController extends Controller
{
    /**
     * Upload image for EditorJS
     */
    public function uploadImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => 0,
                'message' => 'Invalid image file'
            ], 400);
        }

        try {
            $image = $request->file('image');
            $path = $image->store('editor-images', 'public');
            
            return response()->json([
                'success' => 1,
                'file' => [
                    'url' => Storage::url($path),
                    'size' => $image->getSize(),
                    'name' => $image->getClientOriginalName(),
                    'extension' => $image->getClientOriginalExtension()
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => 0,
                'message' => 'Failed to upload image'
            ], 500);
        }
    }

    /**
     * Upload image by URL for EditorJS
     */
    public function uploadImageByUrl(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'url' => 'required|url'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => 0,
                'message' => 'Invalid URL'
            ], 400);
        }

        try {
            $url = $request->input('url');
            
            // Get image content
            $imageContent = file_get_contents($url);
            if (!$imageContent) {
                throw new \Exception('Could not fetch image from URL');
            }

            // Get file extension from URL
            $extension = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION);
            if (!$extension) {
                $extension = 'jpg'; // Default extension
            }

            // Generate unique filename
            $filename = 'editor-' . time() . '.' . $extension;
            $path = 'editor-images/' . $filename;

            // Store the image
            Storage::disk('public')->put($path, $imageContent);

            return response()->json([
                'success' => 1,
                'file' => [
                    'url' => Storage::url($path),
                    'size' => strlen($imageContent),
                    'name' => $filename,
                    'extension' => $extension
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => 0,
                'message' => 'Failed to upload image from URL'
            ], 500);
        }
    }
}
