"use strict";
exports.__esModule = true;
exports.Customer = void 0;
var Customer = /** @class */ (function () {
    function Customer(name, race) {
        this.name = name;
        this.race = race;
    }
    Customer.prototype.boughtDrinks = function () {
        return this._boughtDrinks;
    };
    Customer.prototype.setboughtDrinks = function (value) {
        this._boughtDrinks.push(value);
    };
    return Customer;
}());
exports.Customer = Customer;
