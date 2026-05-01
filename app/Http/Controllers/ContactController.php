<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages=Contact::all();
        return response()->json(['status'=>200,'messages'=>$messages]);
    }

    /**
     * Store a newly created resource in storage.
     */
 public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string',
        'email' => 'required|email',
        'message' => 'required|min:10'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    $data = $validator->validated();

    Contact::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'message' => $data['message']
    ]);

    return response()->json([
        'message' => 'Message sent successfully'
    ], 200);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
