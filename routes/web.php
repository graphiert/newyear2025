<?php

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Index', ['messages' => Message::latest()->get()]);
Route::post('/', function(Request $request) {
  Message::create(['name' => $request->name]);
  return redirect('/');
});
