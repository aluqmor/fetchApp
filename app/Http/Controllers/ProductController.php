<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller {

    function fetch() {
        return view('fetch');
    }

    public function index() {
        return response()->json([
            'products' => Product::orderBy('name')->get()]);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:product|max:100|min2',
            'price' => 'required|numeric|gte:0|lte:100000'
        ]);
        if ($validator->passes()) {
            $object = new Product($request->all());
            try {
                $result = $object->save();
            } catch(\Exception $e) {
                $result = false;
            }
        } else {
            $result = false;
            $message = $validator->getMessageBag();
        }
        
        return response()->json(['result' => $result, 'message' => $message]);
    }

    public function show($id) {
        $product = Product::find($id);
        $message = '';
        if ($product === null) {
            $message = 'Product not found';
        }
        return response()->json([
            'message' => $message,
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product) {
        //
    }

    public function destroy(Product $product) {
        //
    }
}
