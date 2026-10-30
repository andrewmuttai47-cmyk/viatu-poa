const storeName = "Viatu Poa";
const deliveryFee = 300;
const freeDeliveryLimit = 5000;
const discountRate = 0.1;
const discountLimit = 8000;

let cart = [];
let subtotal = 0;
let isLoggedIn = false;

const shoes = [
  { id: 1, name: "Nike Air Max",   price: 6500, inStock: true, image: "1073404892445614153.jfif" },
  { id: 2, name: "Adidas Runner",  price: 5500, inStock: true, image: "784963410094825654.jfif" },
  { id: 3, name: "Bata School Shoes", price: 1800, inStock: true, image: "Geox Boys Smart Black Leather Slip-On Shoes.jfif" },
  { id: 4, name: "Leather Official", price: 4200, inStock: false, image: "Men's Black Cap-Toe Leather Oxfords — Hatherley - 14_5 _ Black _ D.jfif" },
  { id: 5, name: "Maasai Sandals",  price: 1200, inStock: true, image: "Maasai Handmade Men's Recycled Tire_Tyre Akala Sandals.jfif" },
  { id: 6, name: "Puma Sneakers",   price: 7000, inStock: true, image: "Men's PUMA Speedcat Sneakers – Lightweight & Stylish.jfif" }
];

function showProducts() {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";

  for (let i = 0; i < shoes.length; i++) {
    const shoe = shoes[i];
    let card = "<div class='card'>";
    card += "<img class='product-image' src='images/" + encodeURIComponent(shoe.image) + "' alt=\"" + shoe.name + "\">";
    card += "<h3>" + shoe.name + "</h3>";
    card += "<p class='price'>KSh " + shoe.price + "</p>";

    if (shoe.inStock) {
      card += "<button onclick='addToCart(" + shoe.id + ")'>Add to Cart</button>";
    } else {
      card += "<p class='out'>Out of Stock</p>";
    }

    card += "</div>";
    productsDiv.innerHTML += card;
  }
}

function addToCart(id) {
  for (let i = 0; i < shoes.length; i++) {
    if (shoes[i].id === id) {
      cart.push(shoes[i]);
    }
  }
  showCart();
}

function showCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  subtotal = 0;

  for (let i = 0; i < cart.length; i++) {
    list.innerHTML += "<li>" + cart[i].name + " - KSh " + cart[i].price + "</li>";
    subtotal = subtotal + cart[i].price;
  }

  let discount = 0;
  let delivery = 0;
  let message = "";

  if (subtotal >= discountLimit) {
    discount = subtotal * discountRate;
    message = "You got a 10% discount!";
  } else if (subtotal > 0) {
    message = "Spend KSh " + (discountLimit - subtotal) + " more to get 10% off.";
  }

  if (subtotal === 0) {
    delivery = 0;
  } else if (subtotal >= freeDeliveryLimit) {
    delivery = 0;
    message += " Free delivery!";
  } else {
    delivery = deliveryFee;
  }

  const total = subtotal - discount + delivery;

  document.getElementById("item-count").textContent = cart.length;
  document.getElementById("subtotal").textContent = subtotal;
  document.getElementById("discount").textContent = discount;
  document.getElementById("delivery").textContent = delivery;
  document.getElementById("total").textContent = total;
  document.getElementById("message").textContent = message;
}

function clearCart() {
  cart = [];
  showCart();
}

document.getElementById("clear-btn").addEventListener("click", clearCart);

console.log("Welcome to " + storeName);
showProducts();
showCart();
