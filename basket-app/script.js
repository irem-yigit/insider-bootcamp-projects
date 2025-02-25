const user = {
    name: prompt("Enter your name: "),
    age: parseInt(prompt("Enter your age: ")),
    job: prompt("Enter your job: ")
};

console.log("User information: ", user);

let basket = [];

// Add product
function addProduct(){
    let name = prompt("Enter the name of the product: ");
    let price = parseFloat(prompt("Enter the price of the product: "));

    if (!name || isNaN(price)) {
        alert("Invalid input. Please enter a valid name and price.");
        return;
    }
    basket.push({name: name, price: price});
    console.log(`${name} added to the basket. Price: ${price} `, basket);
}

// List basket
function listBasket(){
    if(basket.length === 0){
        console.log("Your basket is empty.");
        return;
    }

    console.log("Basket contents:");
    basket.forEach((product, index) =>{
        console.log(`${index+1}. ${product.name} - ${product.price} TL`);
    });
}

// Remove product 
function removeProduct(){
    listBasket();
    let index = parseInt(prompt("Enter the index of the product you want to remove: ")) - 1;

    if(index >= 0 && index < basket.length){
        let removedProduct = basket.splice(index, 1);
        console.log(`${removedProduct[0].name} removed from the basket. Price: ${removedProduct[0].price} TL`);
        console.log("Basket: ", basket);
    }else{
        console.log("Invalid index. Please enter a valid index.");
    }
}

// Calculate total price
function calculateTotalPrice(){
    let totalPrice = basket.reduce((acc, product) => acc + product.price, 0);
    console.log(`Total price: ${totalPrice.toFixed(2)} TL`);
}

while (true){
    let choice = prompt("Welcome to the basket app!\nPlease select the action you wish to perform.\n 1- Add product\n 2- View basket\n 3- Remove product \n 4- Calculate total price\n 5- Exit");  

    switch(choice){
        case "1":
            addProduct();
            break;
        case "2":
            listBasket();
            break;
        case "3":
            removeProduct();
            break;
        case "4":
            calculateTotalPrice();
            break;
        case "5":
            console.log("Exiting the application...");
            break;
        default:
            console.log("Invalid choice. Please enter a valid option.");
    }
}
