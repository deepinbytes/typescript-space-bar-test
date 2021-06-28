import Bar from "./bar";


const myBar = new Bar("Space Cowboy", 2)
myBar.name();
myBar.occupancy();
myBar.addCustomer("R2D2", "robot");
myBar.occupancy();
myBar.addCustomer("C3P0", "robot");
myBar.addCustomer("Sheriff", "human");
myBar.displayCustomers();
myBar.addDrink("Bloody Marry", 10, 10);
myBar.addDrink("Mojito", 2, 3);
myBar.addDrink("Gin & Tonic", 5, 40);
myBar.displayDrinks();
myBar.buyDrink("C3P0", "Mojito", 2);
myBar.buyDrink("R2D2", "Bloody Marry", 3);
myBar.buyDrink("R2D2", "Gin & Tonic", 3);
myBar.displayDrinks();
myBar.displayBoughtDrinks();
myBar.displayBoughtDrinksByTotalPrice();
myBar.buyDrink("testNotExisting", "Mojito", 2);
myBar.buyDrink("C3P0", "testNotExisting", 2);
myBar.buyDrink("C3P0", "Bloody Marry", 12);