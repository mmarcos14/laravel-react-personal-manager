<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\SpentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (LOGIN / REGISTER)
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/user/reset', [AuthController::class, 'reset']);
Route::post('/logout', [AuthController::class, 'logout']);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (AUTH SANCTUM)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    |-------------------------
    | USER
    |-------------------------
    */
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::get('/user/index', [UserController::class, 'index']);
    Route::post('/user/update', [UserController::class, 'update']);

    /*
    |-------------------------
    | SPENT
    |-------------------------
    */
    Route::get('/spent/index', [SpentController::class, 'index']);
    Route::post('/spent/store', [SpentController::class, 'store']);
    Route::post('/spent/update', [SpentController::class, 'update']);
    Route::delete('/spent/delete/{id}', [SpentController::class, 'destroy']);
    Route::post('/filter/store', [SpentController::class, 'filter']);

    /*
    |-------------------------
    | NOTES
    |-------------------------
    */
    Route::get('/notes/index', [NoteController::class, 'index']);
    Route::post('/notes/store', [NoteController::class, 'store']);
    Route::post('/notes/update', [NoteController::class, 'update']);
    Route::delete('/notes/delete/{id}', [NoteController::class, 'destroy']);


});

/*
|--------------------------------------------------------------------------
| CONTACT
|--------------------------------------------------------------------------
*/

// public contact message
Route::post('/contact/message', [ContactController::class, 'store']);

// admin only
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/contact/list', [ContactController::class, 'index']);
});