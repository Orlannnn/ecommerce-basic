const urlParams = new URLSearchParams(window.location.search);
const productid = urlParams.get("id");
const CART_KEY = "cart"; // Key untuk localStorage

async function detailcontainer(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();

    const imagecontainer = document.getElementById("image-container");
    imagecontainer.innerHTML = ` 
      <img src="${product.image}" alt="${product.title}" class="flex h-96 object-contain p-14"/>
      <div class="flex space-x-4 mt-4">
        <div class="border-2 border-[#B7B7B7] rounded-md w-20 h-20 flex"></div>
        <div class="border-2 border-[#B7B7B7] rounded-md w-20 h-20 flex"></div>
        <div class="border-2 border-[#B7B7B7] rounded-md w-20 h-20 flex"></div>
        <div class="border-2 border-[#B7B7B7] rounded-md w-20 h-20 flex"></div>
      </div>
    `;

    const detailcontainer = document.getElementById("detail");
    detailcontainer.innerHTML = `
      <h1 class="text-2xl font-bold mb-2">${product.title}</h1>
      <h2 class="text-xl font-bold mb-4">$${product.price}</h2>
      <h3 class="text-xl font-bold mb-2">Description</h3>
      <p class="text-justify mb-4 mr-20 text-base">${product.description}</p>

      <label for="sizeSelect" class="block mb-2 text-sm font-medium text-gray-700">Pilih Ukuran:</label>
      <select id="sizeSelect" class="mb-6 block w-52 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-semibold text-gray-700">

        <option value="">Pilih ukuran</option>
        <option value="S">S - Small</option>
        <option value="M">M - Medium</option>
        <option value="L">L - Large</option>
        <option value="XL">XL - Extra Large</option>
      </select>

      <button id="addToCart" class="bg-black text-white py-2 px-6 rounded-md cursor-pointer mr-5">Add To Cart</button>
      <button id="Checkout" class="bg-black text-white py-2 px-6 rounded-md cursor-pointer">Checkout</button>
    `;

    // Event listener untuk Add to Cart
    document.getElementById("addToCart").addEventListener("click", () => {
      const selectedSize = document.getElementById("sizeSelect").value;
      if (!selectedSize) {
        alert("Pilih ukuran terlebih dahulu");
        return;
      }

      addToCart(product, selectedSize);
    });

    // Event listener untuk Checkout langsung
    document.getElementById("Checkout").addEventListener("click", () => {
      const selectedSize = document.getElementById("sizeSelect").value;
      if (!selectedSize) {
        alert("Pilih ukuran dulu sebelum checkout, yaaa~ 😖💕");
        return;
      }

      const selectedItems = [{
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        size: selectedSize,
        selected: true
      }];

      localStorage.setItem("selectedCartItems", JSON.stringify(selectedItems));
      window.location.href = "home.html";
    });

  } catch (error) {
    console.error("Gagal ambil data produk:", error);
    alert("Yahh datanya error T_T");
  }
}

// Fungsi untuk tambah ke keranjang
function addToCart(product, selectedSize) {
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  const existing = cart.find(item => item.id === product.id && item.size === selectedSize);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize
    });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  alert("Produk masuk keranjang~ 🎉");
}

// Mulai proses
if (productid) {
  detailcontainer(productid);
} else {
  console.error("No product ID ditemukan di URL");
}
