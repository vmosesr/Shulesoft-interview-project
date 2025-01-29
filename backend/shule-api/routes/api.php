<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;

// Route::resource('posts', PostsController::class);
// Or explicitly:
Route::get('/posts', [PostsController::class, 'index']);
Route::post('/posts', [PostsController::class, 'store']);
Route::get('/posts/{id}', [PostsController::class, 'show']);
Route::put('/posts/{id}', [PostsController::class, 'update']);
Route::delete('/posts/{id}', [PostsController::class, 'destroy']);