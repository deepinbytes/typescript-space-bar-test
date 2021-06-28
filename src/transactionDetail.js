"use strict";
exports.__esModule = true;
exports.TransactionDetail = void 0;
var TransactionDetail = /** @class */ (function () {
    function TransactionDetail(drink, customer, quantity) {
        this.drink = drink;
        this.customer = customer;
        this.quantity = quantity;
        this.totalPrice = drink.price * quantity;
        //this.drink.quantity=this.drink.quantity-quantity;
    }
    return TransactionDetail;
}());
exports.TransactionDetail = TransactionDetail;
