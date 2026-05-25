<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //

    public function index(Request $request){
        $users=User::orderby("id",'DESC')->get();
        return response()->json(['usery'=>$users]);
    }



    public function update(Request $request)
{
    //dd($request->user_status);
    $user=User::find($request->id);
    $user->update(['status'=> $request->role]);

    return response()->json(['user' => $user]);
}
}
