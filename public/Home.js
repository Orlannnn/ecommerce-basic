async function ambilData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    const container = document.getElementById("data-product");

    // Pastikan kontainernya grid
    container.className =
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";

    data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className =
        "bg-white p-4 rounded-lg shadow hover:shadow-md transition";

      postElement.innerHTML = `
         <a href="detail.html?id=${post.id}">
          <div class="border p-4 rounded-lg hover:shadow-lg transition bg-white">
            <img src="${post.image}" alt="${post.title}" class="w-50 h-40 object-contain mb-4 mx-auto">
          </div>
          <div class="mt-2">
            <h3 class="text-md font-extrabold font-serif text-cyan-800 line-clamp-2 mb-1 merriweather ">${post.title}</h3>
            <h3 class="text-md font-medium font-serif text-blue-800 line-clamp-2 mb-1 truncate left-2.5"->${post.description}</h3>
            <p class="text-green text-lg font-semibold py-1 text-green-700">$${post.price}</p>
            <p class="text-yellow-300 text-lg mb-2 ">★★★★★</p>
            </a>
            <button class="mt-2 bg-[#263034] text-white px-4 py-2 rounded ">Check Out</button>
            
            
          </div>
        `;
    
      
      container.appendChild(postElement);
    });

    console.log("Data Post:", data);
  } catch (error) {
    console.log("Data Error", error);
  }
}

ambilData();