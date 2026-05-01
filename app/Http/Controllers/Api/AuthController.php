<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    // =========================
    // 🔹 REGISTER
    // =========================
    public function register(Request $request)
    {
        // 1. Valider les données
        $errors = $this->validateRegister($request);

        if ($errors) {
            return response()->json([
                'errors' => $errors
            ], 422);
        }

        // 2. Créer l'utilisateur
        $user = $this->createUser($request);

        // 3. Connecter l'utilisateur
        Auth::login($user);

        // 4. Retour
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 200);
    }

    // =========================
    // 🔹 LOGIN
    // =========================
    public function login(Request $request)
    {
        // 1. Vérifier les champs
        if (!$request->email || !$request->password) {
            return response()->json([
                'message' => 'Email and password required'
            ], 422);
        }

        // 2. Tenter connexion
        $success = Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ]);

        if (!$success) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 422);
        }

        // 3. Régénérer session
        $request->session()->regenerate();

        // 4. Retour utilisateur
        return $this->getUser();
    }

    // =========================
    // 🔹 GET USER
    // =========================
    public function getUser()
    {
        return response()->json([
            'user' => Auth::user()->load('notes')
        ], 200);
    }

    // =========================
    // 🔹 LOGOUT
    // =========================
    public function logout(Request $request)
    {
        Auth::logout();

        // nettoyer session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out'
        ], 200);
    }

    // =========================
    // 🔹 RESET PASSWORD
    // =========================
    public function reset(Request $request)
    {
        // 1. Validation
        $errors = $this->validateReset($request);

        if ($errors) {
            return response()->json([
                'errors' => $errors
            ], 422);
        }

        // 2. Trouver utilisateur
        $user = $this->findUserByEmail($request->email);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        // 3. Modifier mot de passe
        $this->updatePassword($user, $request->password);

        // 4. Connexion automatique
        Auth::login($user);

        // 5. Réponse
        return response()->json([
            'message' => 'Password reset successfully'
        ], 200);
    }

    // =====================================
    // 🔧 FONCTIONS SIMPLES (HELPERS)
    // =====================================

    // 🔹 Validation register
    private function validateRegister($request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        return $validator->fails() ? $validator->errors() : null;
    }

    // 🔹 Créer user
    private function createUser($request)
    {
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    }

    // 🔹 Validation reset
    private function validateReset($request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed'
        ]);

        return $validator->fails() ? $validator->errors() : null;
    }

    // 🔹 Trouver user
    private function findUserByEmail($email)
    {
        return User::where('email', $email)->first();
    }

    // 🔹 Update password
    private function updatePassword($user, $password)
    {
        $user->update([
            'password' => Hash::make($password)
        ]);
    }
}