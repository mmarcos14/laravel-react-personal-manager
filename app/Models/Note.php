<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;
    protected $table="notes";
    protected $fillable = ['title','messages','date_event','user_id'];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
