import {Customer} from "./customer";
import {DrinkDetail} from "./drinkDetail";

export class TransactionDetail {
    public customer: Customer;
    public drink: DrinkDetail;
    public totalPrice: number;
    public quantity: number;

    constructor(drink: DrinkDetail, customer: Customer, quantity: number ) {
        this.drink = drink;
        this.customer = customer;
        this.quantity= quantity;
        this.totalPrice = drink.price * quantity;
        //this.drink.quantity=this.drink.quantity-quantity;
    }
}