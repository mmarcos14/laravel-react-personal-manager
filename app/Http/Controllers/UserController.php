<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
    $user = User::find($request->user_id);
    $user->update(['status'=> $request->user_status]);

    return response()->json(['user' => $user]);
}
}
