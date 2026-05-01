<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spent extends Model
{
    use HasFactory;

    protected $table="spents";
    protected $fillable = ['type','transaction_method','destination','amount','operation_date','user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}