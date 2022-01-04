// function redirection to index.html if Cart shopping is empty
redirect();
//display quantity of product in li link "panier" (nav)
displayTotalProductCart();
//display total qtt beetween total price
displayTotalQtt(totalQuantity);
//get products from api and keep data in array "productData"
getData();

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
