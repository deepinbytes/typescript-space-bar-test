import {Customer} from "./customer";
import {DrinkDetail} from "./drinkDetail";
import {TransactionDetail} from "./transactionDetail";

export default class Bar {

    private readonly _name: string;
    private readonly _maxOccupancy: number = 0;
    private _customers: Customer[] = [];
    private _drinks: DrinkDetail[] = [];
    private _transactions: TransactionDetail[] = [];

    constructor(name: string, maxOccupancy: number) {
        this._maxOccupancy = maxOccupancy;
        this._name = name;
    }

    public name = (): void => {
        console.log("Bar Name: %s\n", this._name)
    };

    private _customerExists = (name: string): Customer => {
        for (const customer of this._customers) {
            if (customer.name == name) {
                return customer;
            }
        }
        return null;
    };

    private _checkDrink = (drinkName: string, quantity: number): DrinkDetail => {
        for (let _i = 0; _i < this._drinks.length; _i++) {
            let drink = this._drinks[_i];
            if (drink.name == drinkName) {
                if (drink.quantity <= 0) {
                    this._drinks.splice(_i, 1);
                    return null;
                }
                if (quantity <= drink.quantity) {
                    return drink;
                }
            }
        }
        return null;
    };

    public occupancy = (): void => {
        let percentage = 100 - (this._customers.length / this._maxOccupancy * 100);
        console.log("Percentage of free slots is: %i% \n", percentage);
    };

    public addCustomer = (name: string, race: string): void => {
        let percentage = 100 - (this._customers.length / this._maxOccupancy * 100);
        if (percentage == 0) {
            console.log("Sorry the bar is at max occupancy \n");
            return;
        }
        if (this._customerExists(name)) {
            console.log("Sorry the customer is already here. Are you a replicant!? \n");
        }
        let customer = new Customer(name, race);
        this._customers.push(customer);
        console.log("Customer " + customer.name + " was added to the Bar \n");
    };

    public addDrink = (name: string, quantity: number, price: number): void => {
        let drinkDetail = new DrinkDetail(name, price, quantity);
        this._drinks.push(drinkDetail);
        console.log("Drink " + drinkDetail.name + " was added to the Bar\n");
    };

    public buyDrink = (customerName: string, drinkName: string, quantity: number): void => {
        let customer = this._customerExists(customerName);
        let drinkDetail = this._checkDrink(drinkName, quantity);
        if (!customer) {
            console.log("Sorry customer: %s is not here\n", customerName);
            return;
        }
        if (!drinkDetail) {
            console.log("Sorry the drink: %s is not available\n", drinkName);
            return;
        }
        let newTransaction = new TransactionDetail(drinkDetail, customer, quantity);
        this._transactions.push(newTransaction);
        drinkDetail.quantity = drinkDetail.quantity - quantity;
        let number = 0;
        if (drinkDetail.quantity == 0) {
            this._drinks.forEach(function (value, i) {
                if (drinkDetail.name == value.name) {
                    number = i;
                }
            });
            this._drinks.splice(number, 1);
        }
    };

    private compareCustomer = (a: Customer, b: Customer) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };

    private compareDrinks = (a: DrinkDetail, b: DrinkDetail) => {
        let a_availableDrinksTotalPrice = a.quantity * a.price;
        let b_availableDrinksTotalPrice = b.quantity * b.price;
        if (a_availableDrinksTotalPrice < b_availableDrinksTotalPrice) {
            return -1;
        }
        if (a_availableDrinksTotalPrice > b_availableDrinksTotalPrice) {
            return 1;
        }
        return 0;
    };

    private compareBoughtDrinks = (a: TransactionDetail, b: TransactionDetail) => {
        if (a.totalPrice < b.totalPrice) {
            return -1;
        }
        if (a.totalPrice > b.totalPrice) {
            return 1;
        }
        return 0;
    };


    public displayCustomers = (): void => {
        this._customers.sort(this.compareCustomer);
        console.log("Current Customers:");
        for (let customer of this._customers) {
            console.log("- %s", customer.name);
        }
        console.log("\n");
    };

    public displayDrinks = (): void => {
        this._drinks.sort(this.compareDrinks);
        console.log("\nAvailable Drinks are:");
        for (let drinks of this._drinks) {
            console.log("- %s - %i$", drinks.name, drinks.quantity * drinks.price);
        }
    };

    public displayBoughtDrinks = (): void => {
        console.log("\nCustomer Orders:");
        for (let customer of this._customers) {
            console.log("- %s", customer.name);
            for (let transaction of this._transactions) {
                if (transaction.customer.name == customer.name) {
                    console.log("\t - %s", transaction.drink.name);
                }
            }
        }
    };

    public displayBoughtDrinksByTotalPrice = (): void => {
        console.log("\nBought drinks:");
        this._transactions.sort(this.compareBoughtDrinks);
        for (let transaction of this._transactions) {
            console.log("- %s - %i", transaction.drink.name, transaction.totalPrice);
        }
        console.log("\n")
    }


}