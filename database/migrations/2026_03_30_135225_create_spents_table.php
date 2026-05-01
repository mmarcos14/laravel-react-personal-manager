<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       // spents migration  
Schema::create('spents', function (Blueprint $table) {
    $table->increments("id");
    $table->string('purple_transaction');
    $table->string('type_transaction');
    $table->string('destination_name');
    $table->decimal('amount',10, 2);
    $table->date('operation_date');
    $table->integer('status')->default(1); // ✅ Nom de colonne correct
    $table->integer('user_id')->unsigned();
    $table->foreign('user_id')->references("id")->on('users')->onDelete('cascade'); // ✅ Parfait
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spents');
    }
};
