const products = [
    { id: 1, name: "Laptop", price: 800, category: "electronics", image: "https://via.placeholder.com/250" },
    { id: 2, name: "Headphones", price: 150, category: "electronics", image: "https://via.placeholder.com/250" },
    { id: 3, name: "T-Shirt", price: 25, category: "fashion", image: "https://via.placeholder.com/250" },
    { id: 4, name: "Sneakers", price: 60, category: "fashion", image: "https://via.placeholder.com/250" }
];

let cart = [];

function displayProducts(filter = "all") {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    const filtered = filter === "all"
        ? products
        : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        container.innerHTML += `
            <div class="product">
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

function filterProducts(category) {
    displayProducts(category);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    document.getElementById("cart-count").innerText = cart.length;

    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `<li>${item.name} - $${item.price}</li>`;
    });

    document.getElementById("cart-total").innerText = total;
}

function openCart() {
    document.getElementById("cart-modal").style.display = "block";
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

displayProducts();
