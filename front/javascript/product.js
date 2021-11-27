var id;
//noeud pour insertion balise img
const itemImg = document.querySelector("div.item__img");
//noeud nom du produit
let titleh1 = document.getElementById("title");
//noeud prix
let price = document.getElementById("price");
//noeud description
let description = document.getElementById("description");
// noeud select color
const selectColors = document.getElementById("colors");
//input quantity
let quantity = document.getElementById("quantity");
//creation de la balise img
let image = document.createElement("img");
//ajout enfant à itemImg
itemImg.appendChild(image);
//balise title du head
let headTitle = document.querySelector("title");
//array of colors products

//FUNCTION TO GET ID
const getId = () => {
	var str = window.location;
	var url = new URL(str);
	id = url.searchParams.get("id");
	console.log(id);
};
getId();

fetch(`http://localhost:3000/api/products/${id}`)
	.then((res) => res.json())
	// .then((data) => console.log(data))
	.then((data) => {
		headTitle.textContent = `${data.name}`;
		image.src = `${data.imageUrl}`;
		image.alt = `${data.altTxt}`;
		titleh1.textContent = `${data.name}`;
		price.textContent = `${data.price}`;
		description.textContent = `${data.description}`;
		let colorsProduct = [data.colors];
		console.log(colorsProduct);
		for (color in colorsProduct) {
			let option = document.createElement("option");
			selectColors.appendChild(option);
			option.value = `${data.colors[color]}`;
			option.textContent = `${data.colors[color]}`;
		}
	});
