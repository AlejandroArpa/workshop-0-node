document.getElementById('fetch-posts').addEventListener('click', () => {
	fetchPosts();
});

const fetchPosts = () => {
	fetch('https://api.escuelajs.co/api/v1/products')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText);
			}
			return response.json();
		})
		.then(posts => {
			displayPosts(posts);
		})
		.catch(error => {
			displayError(error);
		});
};

const displayPosts = (posts) => {
	const postList = document.getElementById('post-list');
	postList.innerHTML = '';
	posts.forEach(post => {
		const cardItem = document.createElement('div');
		const title = document.createElement('h2');
		const price = document.createElement('p');
		const description = document.createElement('p');
		const image = document.createElement('img');
		image.src = post.images[1];
		image.src =  `https${image.src.split('https')[1]}`
		cardItem.appendChild(image);
		title.textContent = post.title;
		cardItem.appendChild(title);
		price.textContent = `Price: ${post.price}`;
		cardItem.appendChild(price);
		description.textContent = post.description;
		cardItem.appendChild(description);
		cardItem.classList.add('card');
		postList.appendChild(cardItem);
	});
};

const displayError = (error) => {
	const errorMessage = document.getElementById('error-message');
	errorMessage.textContent = `Error: ${error.message}`;
};