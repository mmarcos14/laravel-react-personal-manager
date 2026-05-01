<?php

namespace App\Http\Controllers;

use App\Models\Spent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SpentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         $spents=$request->user()->spents()->get();
         return response()->json([
            'status' => 200,
            'spentss' =>$spents
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'type' => 'required|string',
        'transaction_method' => 'required|string',
        'destination' => 'required|string',
        'amount' => 'required|numeric',
        'operation_date' => 'required|date',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'message' => 'Invalid validation',
            'errors' => $validator->errors()
        ], 422);
    }

    // ⚡ logique income / spent


    // ⚡ création de la transaction
    $spent = $request->user()->spents()->create([
        'type' => $request->type,
        'transaction_method' => $request->transaction_method, // conversion
        'destination' => $request->destination,
        'amount' => $request->amount,
        'operation_date' => $request->operation_date,
    ]);

    return response()->json([
        'status' => 200,
        'message' => 'Transaction created successfully',
        'data' => $spent
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
    // 1️⃣ trouver la dépense
    $spent = Spent::find($request->id);
    if (!$spent) {
        return response()->json(['message' => 'Spent not found'], 404);
    }

        // ⚡ logique income / spent
  

        //$n=$spent->amount < 0 && $request->type==="income" ? -($spent->amount) : $spent->amount > 0 && $request->type==="Spent" ? '':'';
    // 2️⃣ mettre à jour les champs
    $spent->update([
        'type' => $request->type,
        'transaction_method' => $request->transaction_method,
        'amount'=>$request->amount ,
        'destination' => $request->destination,
        'operation_date' => $request->operation_date,
    ]);

    // 3️⃣ retourner une réponse
    return response()->json(['message' => 'Spent updated successfully', 'spent' => $spent]);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $spent=Spent::find($id);
         if (!$spent) {
          return response()->json(['message' => 'Spent not found'], 404);
         }

         $spent->delete();
          return response()->json(['message' => 'Spent updated successfully', 'spent' => $spent]);

    }


 public function filter(Request $request)
{
    // 1. Récupérer les données
    $date1 = $request->date1;
    $date2 = $request->date2;
    $type  = $request->type;

    // 2. Commencer la requête
    $query = Spent::query();

    // 3. Filtrer par plage de dates
    if ($date1 && $date2) {
        $query->whereBetween('operation_date', [$date1, $date2]);
    }

    // 4. Filtrer par type (optionnel)
    if ($type) {
        $query->where('type', $type);
    }

    // 5. Exécuter
    $data = $query->orderBy('operation_date', 'desc')->get();

    // 6. Retour
    return response()->json([
        'datas' => $data
    ], 200);
}
}
