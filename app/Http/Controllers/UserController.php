<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);
        if ($validator->passes() &&
            Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json([
                'result' => true,
                'message' => 'Yes ...',
                'user' => $request->user()
            ]);
        }
        return response()->json([
            'result' => false,
            'message' => 'No ...'
        ]);
    }

    function logout(Request $request) {
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['result' => true, 'message' => 'Yes ...', 'csrf' => csrf_token()]);
    }

    function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
        if ($validator->passes()) {
            $this->create($request->all());
            return response()->json(['result' => true, 'message' => 'Yes ...']);
        }
        return response()->json(['result' => false, 'message' => 'No ...']);
    }

    private function create(array $data) {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}