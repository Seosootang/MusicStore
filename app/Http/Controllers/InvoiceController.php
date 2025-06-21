<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Xendit\Configuration;
use Xendit\Invoice\InvoiceApi;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Invoice;
use App\Models\InvoiceProduct;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Xendit\Invoice\CreateInvoiceRequest;
use Illuminate\Support\Facades\DB;
use App\Models\Cart;


class InvoiceController extends Controller
{
    public function __construct() 
    {
        Configuration::setXenditKey(config('xendit.API_KEY'));
    }

    public function index() 
    {
        $userId = Auth::id();
        $invoices = Invoice::with('items', 'items.product')->where('user_id', $userId)->orderBy('created_at', 'desc')->get();
        return Inertia::render('invoice', compact('invoices'));
    }

    public function callbackXendit(Request $request)
    {
        $getToken = $request->header('x-callback-token');
        $callbackToken = config('xendit.CALLBACK_TOKEN');

        if ($getToken !== $callbackToken) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        //cek eksternal id dari xendit dengan external id di database
        $invoice = Invoice::where('invoice_code', $request->external_id)->first();
        if (!$invoice) {
            return response()->json(['message' => 'Invoice not found'], 404);
        }
        $date = date_create($request->paid_at);
        $paid_at = date_format($date, 'Y-m-d H:i:s');
        $invoice->update([
            'paid_at' => $paid_at,
            'status' => ($request->status == 'PAID' || $request->status == 'SETTLED') ? 'paid' : 'failed',
            'payment_methode' => $request->payment_method,
            'payment_channel' => $request->payment_channel,
        ]);

        return response()-> json(['message' => 'Success'], 200);
    }

    public function store() 
    {
        DB::beginTransaction();
        try {
            $userId = Auth::id();
            $carts = Cart::with('product')
                ->where([['user_id', $userId], ['status', 'active']])->get();
            $items = array();
            $amount = 0;
            foreach($carts as $cart) {
                $items[] = [
                    'name' => $cart->product->title,
                    'price' => $cart->product->price,
                    'quantity' => $cart->quantity,
                ];
                $amount += $cart->product->price * $cart->quantity;
            }
            
            $invoice_code = IdGenerator::generate([
                'table' => 'invoices',
                'field' => 'invoice_code',
                'length' => 11,
                'prefix' => 'INV-' . date('y'),
                'reset_on_prefix_change' => true,
            ]);

            $invoice = Invoice::create([
                'user_id' => $userId,
                'invoice_code' => $invoice_code,
                'amount' => $amount,
            ]);

            $xendit_create_invoice = new CreateInvoiceRequest([
                'external_id' => $invoice_code,
                'amount' => $amount,
                'items' => $items,
                'customer' => [
                    'given_names' => Auth::user()->name,
                    'email' => Auth::user()->email,
                ],
                'success_redirect_url' => route('invoice.show', ['id' => $invoice->id]),
                'failure_redirect_url' => route('invoice.show', ['id' => $invoice->id]),
            ]);

            $xendit_api_instance = new InvoiceApi();

            $xendit_invoice = $xendit_api_instance->createInvoice($xendit_create_invoice);

            $invoice->update([
                'invoice_url' => $xendit_invoice['invoice_url'],
            ]);
            
            foreach($carts as $cart) {
                $cart->update([
                    'status' => 'ordered',
                ]);

                $cart->product->update([
                    'stock' => $cart->product->stock - $cart->quantity,
                ]);

                InvoiceProduct::create([
                    'invoice_id' => $invoice->id,
                    'product_id' => $cart->product_id,
                    'quantity' => $cart->quantity,
                    'price' => $cart->product->price,
                ]);
            }
            DB::commit();

            return response()->json([
                'url' => $xendit_invoice['invoice_url'],
            ], 200);

        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function show($id) 
    {
        $invoice = Invoice::with('items', 'items.product')->findOrFail($id);
        return Inertia::render('invoice-detail', compact('invoice'));
    }
}
