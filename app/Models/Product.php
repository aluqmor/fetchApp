<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';

    protected $fillable = ['name', 'price'];

    static function change($request) {
        $product = new Product($request->all());
        return $product->store();
    }

    function modify($request) {
        $result = false;
        try {
            $result = $this->update($request->all());
        } catch(\Exception $e) {
        }
        return $result;
    }

    function store() {
        try {
            $result = $this->save();
        } catch(\Exception $e) {
            $result = false;
        }
        return $result;
    }

}