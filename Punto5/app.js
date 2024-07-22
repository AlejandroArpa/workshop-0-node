const products = [
	{ id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
	{ id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
	{ id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
	{ id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
	{ id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
	{ id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
	{ id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
	{ id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
	{ id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

const showItems = (items) => {
	const itemsList = document.getElementById('product-list');
	itemsList.innerHTML = `
		<tr>
			<th>id</th>
			<th>Nombre</th>
			<th>Categoria</th>
			<th>Precio</th>
			<th>Stock</th>
		</tr>`
	items.forEach(item => {
		const ProductItem = document.createElement('tr');
		ProductItem.innerHTML = `
			<td>${item.id}</td>
			<td>${item.name}</td>
			<td>${item.category}</td>
			<td>${item.price}</td>
			<td>${item.stock}</td>
		`;
		itemsList.appendChild(ProductItem);
	});
	const totalPrice = items.reduce((acc, item) => acc + (item.price * item.stock), 0);
	const total = document.getElementById('total-price');
	total.innerHTML = `Precio total: ${totalPrice}`;
}

document.addEventListener('DOMContentLoaded', () => {
	showItems(products);
	const inputFilter = document.getElementById('category');
	let filter = inputFilter.value;
	inputFilter.onchange = () => {	
		filter = inputFilter.value;
	}
	const buttonFilter = document.getElementById('apply-filter');
	buttonFilter.onclick = () => {
		if (filter){
			const filteredProducts = products.filter(product => product.category.toLowerCase() === filter.toLowerCase());
			showItems(filteredProducts);
		} 
		else {
			showItems(products);
		}
	}
	const inputSearchProduct = document.getElementById('product');
	let searchProduct = inputFilter.value;
	inputSearchProduct.onchange = () => {	
		searchProduct = inputSearchProduct.value;
	}
	const buttonSearchByName = document.getElementById('search-product');
	buttonSearchByName.onclick = () => {
		if (searchProduct){
			const product = products.find(product => product.name.toLowerCase() === searchProduct.toLowerCase());
			const filteredProducts = product ? [product] : [];
			showItems(filteredProducts);
		} 
		else {
			showItems(products);
		}
	}
	const checkResult = document.getElementById('check-result');
	const check = document.getElementById('check-available');
	const checkAvailability = (products) => {
		const availavility = products.every(product => product.stock > 0);
		checkResult.innerHTML = availavility ? 'Todos los productos estan disponibles' : 'Algunos productos no estan disponibles';
	}
	check.onclick = () => {
		checkAvailability(products);
		console.log('Check availability');
	}
	
	const productsNames = document.getElementById('products-names');
	const showNames = document.getElementById('show-names');
	showNames.onclick = () => {
		const names = products.map(product => product.name);
		productsNames.innerHTML = names.join(', ');
	}

});