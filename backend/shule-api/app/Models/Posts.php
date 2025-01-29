<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    /** @use HasFactory<\Database\Factories\PostsFactory> */

    protected $fillable = [
        'title',
        'content',
        'post_category',    
    ];

    use HasFactory;
}
