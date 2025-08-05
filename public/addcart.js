const CART_KEY = "cart";
const cartContainer = document.querySelector(".md\\:col-span-2");
const subtotalEl = document.querySelectorAll(".flex.justify-between.mb-2 span")[1];
const totalEl = document.querySelector(".flex.justify-between.font-semibold.text-lg span:last-child");
const checkoutBtn = document.querySelector("button.font-bold.mt-4");

function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID", { minimumFractionDigits: 0 });
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "flex items-center gap-4 border p-4 rounded-lg shadow-sm";
    div.innerHTML = `
      <input type="checkbox" class="checkbox-item" data-id="${item.id}" checked />
      <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain rounded" />
      <div class="flex-1">
        <h3 class="font-semibold text-lg">${item.title}</h3>
        <p class="text-sm text-gray-500">${formatRupiah(item.price)}</p>
        <div class="mt-2 flex items-center gap-2">
          <input type="number" value="${item.quantity}" min="1" class="w-16 px-2 py-1 border rounded quantity-input" data-id="${item.id}" />
          <button class="text-red-500 hover:underline text-sm delete-btn" data-id="${item.id}">Hapus</button>
        </div>
      </div>
      <div class="text-right font-semibold">${formatRupiah(subtotal)}</div>
    `;

    cartContainer.appendChild(div);
  });

  updateSummary();
}

// Update ringkasan berdasarkan checkbox tercentang
function updateSummary() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const checkboxes = document.querySelectorAll(".checkbox-item");
  let total = 0;

  checkboxes.forEach(cb => {
    if (cb.checked) {
      const item = cart.find(i => i.id == cb.dataset.id);
      total += item.price * item.quantity;
    }
  });

  subtotalEl.textContent = formatRupiah(total);
  totalEl.textContent = formatRupiah(total);
}

// Hapus item
document.addEventListener("click", e => {
  if (e.target.classList.contains("delete-btn")) {
    const id = parseInt(e.target.dataset.id);
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }
});

// Ubah jumlah
document.addEventListener("input", e => {
  if (e.target.classList.contains("quantity-input")) {
    const id = parseInt(e.target.dataset.id);
    const qty = parseInt(e.target.value);
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    const item = cart.find(i => i.id === id);
    if (item) item.quantity = qty;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }
});

// Checkbox berubah? update total
document.addEventListener("change", e => {
  if (e.target.classList.contains("checkbox-item")) {
    updateSummary();
  }
});

// Checkout hanya item terpilih
checkoutBtn.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const checked = [...document.querySelectorAll(".checkbox-item:checked")];
  const selectedItems = checked.map(cb => {
    const id = parseInt(cb.dataset.id);
    return cart.find(item => item.id === id);
  });

  if (selectedItems.length === 0) {
    alert("Pilih setidaknya satu produk untuk checkout, Olan~ 😠");
    return;
  }

  localStorage.setItem("selectedCartItems", JSON.stringify(selectedItems));
  window.location.href = "checkout.html"; // arahkan ke halaman checkout
});

// Kosongkan keranjang
document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem(CART_KEY);
  renderCart();
});

document.addEventListener("DOMContentLoaded", renderCart);
