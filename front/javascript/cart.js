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
//display total quantity in span
const totalQuantity = (document.getElementById("totalQuantity").textContent =
	JSON.parse(localStorage.getItem("totalProduct")));
//get products of api and keep data in array "productData"
getProducts();

setTimeout(() => {
	displayProductStorage();
}, 500);

setTimeout(() => {
	console.log(productData);

	totalPriceCalculation();

	modifyQuantity();

	deleteProduct();
}, 550);

//-----------------------------------------------------
//Form
//-----------------------------------------------------

//Function for display an error message
const errorDisplay = (tag, message, valid) => {
	const p = document.getElementById(`${tag}ErrorMsg`);
	if (!valid) {
		p.textContent = message;
	} else {
		p.textContent = message;
	}
};
//function check value for first name
const firstNameChecker = (value) => {
	// match(/^[a-z]{3,20}$/i
	if (value.length < 2 || value.length > 20) {
		errorDisplay(
			"firstName",
			"Votre prénom doit être compris entre 2 et 20 caractères."
		);
		firstName = null;
	} else if (value.match(/^[a-zéûùîîëêè-]*$/i)) {
		errorDisplay("firstName", "", true);
		firstName = value;
	} else {
		errorDisplay(
			"firstName",
			"Votre prénom ne doit contenir ni chiffres ni caractères spéciaux."
		);
		firstName = null;
	}
};
//check value for last name
//play display error
//keep value in variable
//if error => prevent submit of form => variable = null
const lastNameChecker = (value) => {
	if (value.length < 3 || value.length > 20) {
		errorDisplay(
			"lastName",
			"Votre prénom doit être compris entre 3 et 20 caractères."
		);
		lastName = null;
	} else if (value.match(/^[a-zéûùîîëêèç-]*$/i)) {
		errorDisplay("lastName", "", true);
		lastName = value;
	} else {
		errorDisplay(
			"lastName",
			"Votre prénom ne doit contenir ni chiffres ni caractères spéciaux."
		);
		lastName = null;
	}
};
//check value address
//play display error
//keep value in variable
//if error => prevent submit of form => variable = null
const addressChecker = (value) => {
	if (value.match(/^[0-9]{1,4}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$/)) {
		errorDisplay("address", "", true);
		address = value;
	} else {
		errorDisplay(
			"address",
			"Veuillez saisir le numéro suivi du nom de la voie !"
		);
		address = null;
	}
};
//check value city
//play display error
//keep value in variable
//if error => prevent submit of form => variable = null
const cityChecker = (value) => {
	if (!value.match(/^[0-9]{5}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$/)) {
		errorDisplay(
			"city",
			"Veuillez saisir le code postal suivi du nom de la ville"
		);
		city = null;
	} else {
		errorDisplay("city", "", true);
		city = value;
	}
};
//check value for email
//play display error
//keep value in variable
//if error => prevent submit of form => variable = null
const emailChecker = (value) => {
	if (!value.match(/^[\w\._-]+@[\w-]+\.[a-z]{2,4}$/i)) {
		errorDisplay("email", "Votre adresse mail n'est pas valide");
		email = null;
	} else {
		errorDisplay("email", "", true);
		email = value;
	}
};

//add an event listener for each input and keep value
inputs.forEach((input) => {
	input.addEventListener("input", (e) => {
		switch (e.target.id) {
			case "firstName":
				firstNameChecker(e.target.value); // on récupere ce qu'il y' a de noté dans l'input
				break;
			case "lastName":
				lastNameChecker(e.target.value); // on récupere ce qu'il y' a de noté dans l'input
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
// all values are true ? if yes,push on data when we submit form
form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (firstName && lastName && email && address && city) {
		const data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			address: address,
			city: city,
		};
		console.log(data);
		//on vide nos input aprés soumission du formulaire
		inputs.forEach((input) => {
			input.value = "";
		});
		pseudo = null;
		email = null;
		mdp = null;
		confirmMdp = null;
		alert("Commande envoyée");
	} else {
		alert("Veuillez remplir les champs");
	}
});
// localStorage.clear();
