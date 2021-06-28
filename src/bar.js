"use strict";
exports.__esModule = true;
var customer_1 = require("./customer");
var drinkDetail_1 = require("./drinkDetail");
var transactionDetail_1 = require("./transactionDetail");
var Bar = /** @class */ (function () {
    function Bar(name, maxOccupancy) {
        var _this = this;
        this._maxOccupancy = 0;
        this._customers = [];
        this._drinks = [];
        this._transactions = [];
        this.name = function () {
            console.log("Bar Name: %s\n", _this._name);
        };
        this._customerExists = function (name) {
            for (var _a = 0, _b = _this._customers; _a < _b.length; _a++) {
                var customer = _b[_a];
                if (customer.name == name) {
                    return customer;
                }
            }
            return null;
        };
        this._checkDrink = function (drinkName, quantity) {
            for (var _i = 0; _i < _this._drinks.length; _i++) {
                var drink = _this._drinks[_i];
                if (drink.name == drinkName) {
                    if (drink.quantity <= 0) {
                        _this._drinks.splice(_i, 1);
                        return null;
                    }
                    if (quantity <= drink.quantity) {
                        return drink;
                    }
                }
            }
            return null;
        };
        this.occupancy = function () {
            var percentage = 100 - (_this._customers.length / _this._maxOccupancy * 100);
            console.log("Percentage of free slots is: %i% \n", percentage);
        };
        this.addCustomer = function (name, race) {
            var percentage = 100 - (_this._customers.length / _this._maxOccupancy * 100);
            if (percentage == 0) {
                console.log("Sorry the bar is at max occupancy \n");
                return;
            }
            if (_this._customerExists(name)) {
                console.log("Sorry the customer is already here. Are you a replicant!? \n");
            }
            var customer = new customer_1.Customer(name, race);
            _this._customers.push(customer);
            console.log("Customer " + customer.name + " was added to the Bar \n");
        };
        this.addDrink = function (name, quantity, price) {
            var drinkDetail = new drinkDetail_1.DrinkDetail(name, price, quantity);
            _this._drinks.push(drinkDetail);
            console.log("Drink " + drinkDetail.name + " was added to the Bar\n");
        };
        this.buyDrink = function (customerName, drinkName, quantity) {
            var customer = _this._customerExists(customerName);
            var drinkDetail = _this._checkDrink(drinkName, quantity);
            if (!customer) {
                console.log("Sorry customer: %s is not here\n", customerName);
                return;
            }
            if (!drinkDetail) {
                console.log("Sorry the drink: %s is not available\n", drinkName);
                return;
            }
            var newTransaction = new transactionDetail_1.TransactionDetail(drinkDetail, customer, quantity);
            _this._transactions.push(newTransaction);
            drinkDetail.quantity = drinkDetail.quantity - quantity;
            var number = 0;
            if (drinkDetail.quantity == 0) {
                _this._drinks.forEach(function (value, i) {
                    if (drinkDetail.name == value.name) {
                        number = i;
                    }
                });
                _this._drinks.splice(number, 1);
            }
        };
        this.compareCustomer = function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        };
        this.compareDrinks = function (a, b) {
            var a_availableDrinksTotalPrice = a.quantity * a.price;
            var b_availableDrinksTotalPrice = b.quantity * b.price;
            if (a_availableDrinksTotalPrice < b_availableDrinksTotalPrice) {
                return -1;
            }
            if (a_availableDrinksTotalPrice > b_availableDrinksTotalPrice) {
                return 1;
            }
            return 0;
        };
        this.compareBoughtDrinks = function (a, b) {
            if (a.totalPrice < b.totalPrice) {
                return -1;
            }
            if (a.totalPrice > b.totalPrice) {
                return 1;
            }
            return 0;
        };
        this.displayCustomers = function () {
            _this._customers.sort(_this.compareCustomer);
            console.log("Current Customers:");
            for (var _a = 0, _b = _this._customers; _a < _b.length; _a++) {
                var customer = _b[_a];
                console.log("- %s", customer.name);
            }
            console.log("\n");
        };
        this.displayDrinks = function () {
            _this._drinks.sort(_this.compareDrinks);
            console.log("\nAvailable Drinks are:");
            for (var _a = 0, _b = _this._drinks; _a < _b.length; _a++) {
                var drinks = _b[_a];
                console.log("- %s - %i$", drinks.name, drinks.quantity * drinks.price);
            }
        };
        this.displayBoughtDrinks = function () {
            console.log("\nCustomer Orders:");
            for (var _a = 0, _b = _this._customers; _a < _b.length; _a++) {
                var customer = _b[_a];
                console.log("- %s", customer.name);
                for (var _c = 0, _d = _this._transactions; _c < _d.length; _c++) {
                    var transaction = _d[_c];
                    if (transaction.customer.name == customer.name) {
                        console.log("\t - %s", transaction.drink.name);
                    }
                }
            }
        };
        this.displayBoughtDrinksByTotalPrice = function () {
            console.log("\nBought drinks:");
            _this._transactions.sort(_this.compareBoughtDrinks);
            for (var _a = 0, _b = _this._transactions; _a < _b.length; _a++) {
                var transaction = _b[_a];
                console.log("- %s - %i", transaction.drink.name, transaction.totalPrice);
            }
        };
        this._maxOccupancy = maxOccupancy;
        this._name = name;
    }
    return Bar;
}());
exports["default"] = Bar;
