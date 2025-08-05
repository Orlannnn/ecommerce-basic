const {localStorage } = require("node-localstorage")

const CART_KEY = 'cart';
const cartItemsContainer = document.querySelector('.md\\:col-span-2');
const summaryContainer = document.querySelector('.bg-gray-50');

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatRupiah(amount) {
  return 'Rp' + amount.toLocaleString('id-ID');
}

function updateQuantity(id, quantity) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity = parseInt(quantity) || 1;
    saveCart(cart);
    renderCart();
  }
}

function removeFromCart(id) {
  const cart = getCart().filter(p => p.id !== id);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  cartItemsContainer.innerHTML = '';
  let subtotal = 0;

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("clear-cart")?.addEventListener("click", () => {
      if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
        localStorage.removeItem(CART_KEY);
        renderCart();
      }
    });
  });
  

  cart.forEach(item => {
    const total = item.price * item.quantity;
    subtotal += total;

    const itemEl = document.createElement('div');
    itemEl.className = 'flex items-center gap-4 border p-4 rounded-lg shadow-sm';
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded-lg" />
      <div class="flex-1">
        <h3 class="font-semibold text-lg">${item.title}</h3>
        <p class="text-sm text-gray-500">${formatRupiah(item.price)}</p>
        <div class="mt-2 flex items-center gap-2">
          <input type="number" value="${item.quantity}" min="1" class="w-16 px-2 py-1 border rounded quantity-input" data-id="${item.id}" />
          <button class="text-red-500 hover:underline text-sm remove-btn" data-id="${item.id}">Hapus</button>
        </div>
      </div>
      <div class="text-right font-semibold">${formatRupiah(total)}</div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  summaryContainer.innerHTML = `
    <h3 class="text-xl font-bold mb-4">Ringkasan</h3>
    <div class="flex justify-between mb-2"><span>Subtotal</span><span>${formatRupiah(subtotal)}</span></div>
    <div class="flex justify-between mb-2"><span>Pajak</span><span>${formatRupiah(tax)}</span></div>
    <hr class="my-2" />
    <div class="flex justify-between font-semibold text-lg"><span>Total</span><span>${formatRupiah(grandTotal)}</span></div>
    <button class="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">Checkout</button>
  `;

  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      updateQuantity(id, e.target.value);
    });
  });

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      removeFromCart(id);
    });
  });
}
window.location.href

renderCart();
