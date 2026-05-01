<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $notes=$request->user()->notes()->orderby("id",'DESC')->get();
         return response()->json([
            'status' => 200,
            'nostes' =>$notes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'title'=>'required|string','messages'=>'required','date_event'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'errors'=>$validator->errors(),
                'message'=>'invalid validat'

            ],422);
        }

        $note=  $request->user()->notes()->create([
        'title'=>$request->title,
        'messages'=>$request->messages,
        'date_event'=>$request->date_event
        ]);
        return response()->json([
        'status' => 200,
        'message' => 'Note created successfully',
        'data' => $note
    ]);
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
    public function update(Request $request)
    {
        $note=Note::where('id',$request->id)->first();
        $note->update(['title'=>$request->title,'messages'=>$request->messages,'date_event'=>$request->date_event]);
    }

    /**
     * Remove the specified resource from storage.
     */
 public function destroy(string $id)
{
    $note = Note::find($id);

    if (!$note) {
        return response()->json([
            'message' => 'Note not found'
        ], 404);
    }

    $note->delete();

    return response()->json([
        'message' => 'Note deleted successfully'
    ]);
}
}
