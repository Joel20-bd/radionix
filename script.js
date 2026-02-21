const products = [
    {id:1,name:"Laptop",price:900,img:"https://via.placeholder.com/250"},
    {id:2,name:"Smartphone",price:600,img:"https://via.placeholder.com/250"},
    {id:3,name:"Sneakers",price:120,img:"https://via.placeholder.com/250"},
    {id:4,name:"Watch",price:200,img:"https://via.placeholder.com/250"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("product-container");

function displayProducts(){
    container.innerHTML="";
    products.forEach(p=>{
        container.innerHTML+=`
        <div class="product">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
}

function addToCart(id){
    const item = cart.find(p=>p.id===id);
    if(item){
        item.qty+=1;
    }else{
        const product = products.find(p=>p.id===id);
        cart.push({...product, qty:1});
    }
    updateCart();
}

function updateCart(){
    localStorage.setItem("cart",JSON.stringify(cart));
    document.getElementById("cart-count").innerText=cart.reduce((a,b)=>a+b.qty,0);

    const cartItems=document.getElementById("cart-items");
    cartItems.innerHTML="";
    let total=0;

    cart.forEach(item=>{
        total+=item.price*item.qty;
        cartItems.innerHTML+=`
        <div>
            ${item.name} x${item.qty} - $${item.price*item.qty}
            <button onclick="removeItem(${item.id})">❌</button>
        </div>`;
    });

    document.getElementById("cart-total").innerText=total;
}

function removeItem(id){
    cart=cart.filter(p=>p.id!==id);
    updateCart();
}

function openCart(){
    document.getElementById("cart").classList.add("active");
}

function closeCart(){
    document.getElementById("cart").classList.remove("active");
}

function toggleTheme(){
    document.body.classList.toggle("dark");
}

displayProducts();
updateCart();
