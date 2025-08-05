const CART_KEY = "cart";
const checkoutItems = document.getElementById("checkout-items");
const totalEl = document.getElementById("checkout-total");

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

async function renderCheckout() {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  let total = 0;
  checkoutItems.innerHTML = "";

  for (const item of cart) {
    try {
      // Ambil data fresh dari API
      const res = await fetch(`https://fakestoreapi.com/products/${item.id}`);
      const product = await res.json();
      const subtotal = product.price * item.quantity;
      total += subtotal;

      const div = document.createElement("div");
      div.className = "flex items-center gap-4 border-b pb-4";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="w-24 h-24 object-contain rounded" />
        <div class="flex-1">
          <h3 class="font-semibold text-lg">${product.title}</h3>
          <p class="text-sm text-gray-600">Jumlah: ${item.quantity}</p>
          <p class="text-sm text-gray-500">Harga satuan: ${formatRupiah(product.price)}</p>
        </div>
        <div class="text-right font-semibold">${formatRupiah(subtotal)}</div>
      `;
      checkoutItems.appendChild(div);
    } catch (error) {
      console.error("Gagal fetch data dari API untuk produk ID:", item.id);
    }
  }

  totalEl.textContent = formatRupiah(total);
}

document.addEventListener("DOMContentLoaded", renderCheckout);

document.getElementById("bayar").addEventListener("click", () => {
  const method = document.getElementById("payment-method").value;
  const name = document.getElementById("card-name").value;
  const number = document.getElementById("card-number").value;
  const pembeli = document.getElementById("nama-pembeli").value;
  const telp = document.getElementById("telepon").value;
  const alamat = document.getElementById("alamat").value;

  if (!pembeli || !telp || !alamat) {
    alert("Isi semua data pembeli");
    return;
  }

  if (method === "") {
    alert("Pilih metode pembayaran dulu yaa~ ");
    return;
  }

  if (method === "credit" && (!name || !number)) {
    alert("Isi semua detail kartu kredit yaa~");
    return;
  }

  alert("Pembayaran berhasil! Terima kasih belanjanya");
  localStorage.removeItem(CART_KEY);
  window.location.href = "home.html";
});
