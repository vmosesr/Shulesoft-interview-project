<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    public function index()
    {
        return Posts::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required|max:255',
            'post_category' => 'required',
        ]);

        $post = Posts::create($request->all());

        return response()->json([
            'message' => 'Post created',
            'post' => $post
        ], 201);
    }

    public function show($id) 
    {
        $post = Posts::findOrFail($id);
        return response()->json($post);
    }

    public function update(Request $request, $id)
    {
        $post = Posts::findOrFail($id);

        $fields = $request->validate([
            'title' => 'required',
            'content' => 'required|max:255',
            'post_category' => 'required',
        ]);

        $post->update($fields);

        return response()->json([
            'message' => 'Post updated',
            'post' => $post
        ]);
    }

    public function destroy($id)  // Changed parameter
    {
        $post = Posts::findOrFail($id);
        $post->delete();

        return response()->json([
            'message' => 'Post deleted'
        ]);
    }
}