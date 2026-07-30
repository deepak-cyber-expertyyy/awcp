<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category_id',
        'image',
        'description',
        'short_description',
        'tags',
        'meta_title',
        'meta_keywords',
        'meta_description',
        'views_count',
        'status'
    ];

    protected $hidden = ['updated_at'];

    protected $appends = ['image_url', 'read_time', 'views_count'];

    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'category_id');
    }

    public function views()
    {
        return $this->hasMany(BlogView::class);
    }

    public function getReadTimeAttribute()
    {
        $wordCount = str_word_count(strip_tags($this->description));
        $readTimeMinutes = ceil($wordCount / 200); // Using 200 words per minute
        $readTimeMinutes = max(1, $readTimeMinutes); // Minimum 1 minute
        
        if ($readTimeMinutes < 60) {
            return $readTimeMinutes . ($readTimeMinutes == 1 ? ' Minute' : ' Minutes');
        } else {
            $hours = floor($readTimeMinutes / 60);
            $minutes = $readTimeMinutes % 60;
            
            $timeString = '';
            if ($hours > 0) {
                $timeString .= $hours . ($hours == 1 ? ' Hour' : ' Hours');
            }
            if ($minutes > 0) {
                if ($hours > 0) {
                    $timeString .= ' ';
                }
                $timeString .= $minutes . ($minutes == 1 ? ' min' : ' mins');
            }
            
            return $timeString;
        }
    }

    public function getViewsCountAttribute()
    {
        return $this->views()->count();
    }

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset('storage/' . $this->image);
        }
        return null;
    }

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', '%' . $search . '%')
              ->orWhere('description', 'like', '%' . $search . '%');
        });
    }
}
