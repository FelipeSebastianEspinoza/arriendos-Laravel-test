<?php

use Illuminate\Support\Facades\Route;
 
Route::resource('/categorias', 'CategoriaController') ;


Route::get('/{any}', function(){
    return view('spa');
})->where('any','.*');