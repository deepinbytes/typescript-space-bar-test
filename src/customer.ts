import {DrinkDetail} from "./drinkDetail";

export class Customer {
    public boughtDrinks(): [DrinkDetail] {
        return this._boughtDrinks;
    }

    public setboughtDrinks(value: DrinkDetail) {
        this._boughtDrinks.push(value);
    }
    public name: string;
    public race: string;
    private _boughtDrinks: [DrinkDetail];
    constructor(name: string, race: string) {
        this.name = name;
        this.race = race;
    }

}