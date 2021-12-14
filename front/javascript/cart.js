//get all inputs of form
const inputs = document.querySelectorAll(
	'input[type="text"],input[type="email"]'
);
// console.log(inputs);
//get form for submit
const form = document.querySelector(".cart__order__form");
//variable for keep value of inputs
let firstName, lastName, address, city, email;
//get element cart__items
const cart__items = document.getElementById("cart__items");
// console.log(cart__items);

// function redirection to index.html if Cart shopping is empty
redirect();
//display quantity of product in li link "panier"
displayTotalProductCart();
// //display total quantity in span
const totalQuantity = (document.getElementById("totalQuantity").textContent =
	JSON.parse(localStorage.getItem("totalProduct")));
//get products of api and keep data in array "productData"
getProducts();

setTimeout(() => {
	displayProductStorage();
}, 500);

setTimeout(() => {
	// console.log(productData);

	totalPriceCalculation();

	modifyQuantity();

	deleteProduct();
}, 550);

//-----------------------------------------------------
//Form
//-----------------------------------------------------

//add an event listener for each input and check values
inputs.forEach((input) => {
	input.addEventListener("input", (e) => {
		switch (e.target.id) {
			case "firstName":
				firstNameChecker(e.target.value);
				break;
			case "lastName":
				lastNameChecker(e.target.value);
				break;
			case "address":
				addressChecker(e.target.value);
				break;
			case "city":
				cityChecker(e.target.value);
				break;
			case "email":
				emailChecker(e.target.value);
				break;
			default:
				null;
		}
	});
});

submitOrder();
