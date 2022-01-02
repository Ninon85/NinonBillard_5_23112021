// //ajout enfant à itemImg
//------------------------------------------------
itemImg.appendChild(image);

getId();
integrateDataHtml();

// displayTotalProductCart();

//listen events of the button to add to the cart
addToCart.addEventListener("click", () => {
	let recapChoice = {
		idProduct: id,
		color: selectColors.value,
		quantityNumber: quantity.value,
	};

	if (selectColors.value === "") {
		alert("Veuillez selectionner une couleur");
	} else if (recapChoice.quantityNumber === "0") {
		alert("Veuillez choisir une quantité");
		//if productstorage is not empty
	} else if (recapChoice.quantityNumber > 100) {
		alert("Vous ne pouvez pas commander plus de 100 articles");
	} else if (productStorage) {
		// console.log(productStorage);

		//find index where id and color are the same than in recapChoice
		let findIndex = productStorage.findIndex(
			(i) =>
				recapChoice.color === i.color && recapChoice.idProduct === i.idProduct
		);
		//if color and id match
		if (findIndex !== -1) {
			//parse into number quantity at found index of productStorage
			productStorage[findIndex].quantityNumber = parseInt(
				productStorage[findIndex].quantityNumber
			);
			// parse into number quantity in recapChoice
			recapChoice.quantityNumber = parseInt(recapChoice.quantityNumber);
			//make the sum of quantity and keep the value at found index of productStorage
			productStorage[findIndex].quantityNumber =
				productStorage[findIndex].quantityNumber + recapChoice.quantityNumber;
			// convert product storage into string with key "product"
			localStorage.setItem("product", JSON.stringify(productStorage));
			//Replace quantity value at index found for make the sum of products
			quantityParsed[findIndex] = parseInt(
				productStorage[findIndex].quantityNumber
			);
			makeSumQuantity(quantityParsed);
			displayTotalProductCart();
			// if quantity for a product = 100, replace quantity value at index found by 100
			if (findIndex !== -1 && productStorage[findIndex].quantityNumber >= 100) {
				alert("Vous avez atteint la quantité maximale de 100 pour cet article");
				productStorage[findIndex].quantityNumber = 100;
				localStorage.setItem("product", JSON.stringify(productStorage));
				quantityParsed[findIndex] = parseInt(
					productStorage[findIndex].quantityNumber
				);
				makeSumQuantity(quantityParsed);
				displayTotalProductCart();
			}
		} else {
			//if no match for id and color
			addToLocalStorage(recapChoice);
			quantityParsed.push(parseInt(quantity.value));
			makeSumQuantity(quantityParsed);
			displayTotalProductCart();
		}
		//if productStorage is empty, convert into an array
	} else if (productStorage === null) {
		productStorage = [];
		addToLocalStorage(recapChoice);
		quantityParsed.push(parseInt(productStorage[0].quantityNumber));
		makeSumQuantity(quantityParsed);
		displayTotalProductCart();
	}
});
// localStorage.clear();
// console.log(productStorage);
