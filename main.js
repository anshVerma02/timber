//Aos config

AOS.init({
  duration: 1000,
  once: false,
   mirror: true,
   easing: "ease-in-out"
});

//nav

const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

//products 

  // ===============================
// Product Modal Logic
// ===============================
let currentImageIndex = 0;
let modalImages = [];

const placeholderImages = [
  "https://via.placeholder.com/600x400",
  "https://via.placeholder.com/600x400",
  "https://via.placeholder.com/600x400",
  "https://via.placeholder.com/600x400",
];

// ✅ Each product has its own image array
const productImages = {
  teak: [
    "./images/products/teak-1.jpg",
    "./images/products/teak-2.jpg",
    "./images/products/teak-3.jpg",
  ],
  meranti: [
    "./images/products/meranti-1.jpg",
    "./images/products/meranti-2.jpg",
  ],
  pine: ["./images/products/pine-1.jpg", "./images/products/pine-2.jpg"],
  sal: [
    "./images/products/sal-1.jpg",
    "./images/products/sal-2.jpg",
    "./images/products/sal-3.jpg",
  ],
  doorFrames: ["./images/door.jpg",],
  windowFrames: [
    "./images/products/window-1.jpg",
    "./images/chemical.jpg",
  ],
  planks: ["./images/planks-2.jpg", "./images/planks.jpg"],
  plywood: [
    "./images/veneer.jpg",
    "./images/products/ply.jpg",
  ],
  mouldings: [
    "./images/products/moulding-1.jpg",
    "./images/products/moulding-2.jpg",
    "./images/products/moulding-3.jpg",
  ],
  doors: [
    "./images/products/door-2.jpg",
    "./images/products/door-3.jpg",
    "./images/products/door-4.jpg",
  ],
  shuttering: [
    "./images/shuttering.jpg",
    "./images/products/shuttering-2.jpg",
  ],
  european: [
    "./images/products/european-2.jpg",
    "./images/products/european-3.jpg",
    "./images/products/european-4.jpg",
  ],
};

// Long Descriptions
const longDescriptions = {
  teak: "Teak wood is one of the most sought-after hardwoods, valued for its golden-brown appearance, strength, and exceptional resistance to moisture and decay. It is widely used for making luxury furniture, doors, windows, flooring, and even marine applications due to its weather-resistant properties. Its fine grain and natural oils make it long-lasting and low-maintenance. At our company, we provide the best quality Teak wood to suit all construction and furnishing needs.",
  meranti:
    "Meranti wood is a medium-density hardwood commonly used in furniture, interior fittings, window frames, and light construction. Its reddish-brown shade and smooth texture make it visually appealing and easy to polish. It is resistant to warping and splitting, making it a reliable choice for long-term use. We ensure high-quality Meranti wood that matches durability with affordability for all kinds of projects.",
  pine: "Pine wood is a softwood known for its pale color, straight grain, and ease of machining. It is widely used for making furniture, interior paneling, wooden flooring, and decorative applications. Due to its lightweight yet sturdy nature, Pine wood is also favored in carpentry and DIY projects. Our company provides high-quality Pine wood suitable for cost-effective yet durable solutions in interiors and construction.",
  sal: "Sal wood is a tough and heavy hardwood widely used in construction, railway sleepers, beams, and door/window frames. With a coarse texture and natural resistance to termites and decay, Sal wood is trusted for structural applications requiring strength and longevity. It is also commonly used for making robust furniture. We supply top-grade Sal wood for all heavy-duty and construction requirements.",
  doorFrames:
    "Our wooden door frames are manufactured from high-quality hardwoods like Teak, Sal, and Meranti, ensuring strength, durability, and long life. They are resistant to warping and provide the perfect support for flush and solid doors. Available in multiple sizes and finishes, these frames combine strength with aesthetics, making them ideal for homes, offices, and commercial projects. We guarantee the finest quality door frames for all your architectural needs.",
  windowFrames:
    "Our wooden window frames are carefully crafted using premium woods such as Teak, Sal, and Meranti to ensure durability, termite resistance, and smooth finishes. They are designed to withstand weather conditions while maintaining strength and shape. With options for custom sizes and designs, our high-quality window frames are perfect for residential and commercial construction projects.",
  planks:
    "Wooden planks are essential in construction, flooring, furniture, and decorative applications. We provide planks in various hardwoods and softwoods, seasoned and treated to prevent warping and damage. Our planks are known for their consistent thickness, fine finish, and superior strength. We supply premium quality wooden planks to meet diverse industrial and residential requirements.",
  plywood:
    "Our plywood and veneers are manufactured with precision and durability in mind, offering strength and flexibility for a wide range of uses. Plywood is ideal for furniture, cabinets, and partitions, while veneers enhance surfaces with premium natural wood finishes. Both are treated for termite resistance and long-lasting performance. We supply top-grade plywood and veneer to meet both functional and aesthetic demands.",
  mouldings:
    "Moulding and margins are essential for adding decorative and finishing touches to interiors, furniture, and wooden structures. Our moulding are precision-made from high-quality timber to ensure smooth finishes, durability, and resistance to wear. Available in different shapes and sizes, they add elegance and detail to doors, windows, and paneling. We provide the finest moulding and margins to complement any architectural or decorative project.",
  doors:
    "We manufacture high-quality solid wood doors and flush doors to suit different architectural needs. Solid doors are known for their strength and traditional appearance, while flush doors offer modern, smooth surfaces and lightweight functionality. Both types are treated for durability and resistance to termites. Available in various sizes and finishes, our premium doors  ensure security and elegance for homes and commercial projects.",
  shuttering: "Shuttering ply is an essential material in construction, used for form work in concrete structures. Our shuttering ply is manufactured with durable hardwood veneers and treated for water resistance and strength. It can withstand repeated use without losing shape or durability, making it highly cost-effective. We supply high-quality shuttering ply for reliable performance in construction projects.",
  european:
    "Our selection of European woods includes premium varieties such as White Ash, Steam Beech, Maple, Red Cedar, Ebony, Rosewood, Cherry wood, and Oak wood. Each species brings its own unique strength, texture, and color, making them ideal for luxury furniture, flooring, interiors, and architectural applications. Known for durability, fine grain, and aesthetic appeal, European woods are widely used in high-end projects. We ensure best-quality imported wood to match every design and structural requirement.",
};

// ===============================
// Modal Functions
// ===============================
function openModal(title, images, description) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent = description;

  modalImages = images;
  currentImageIndex = 0;
  renderImages();

  document.getElementById("productModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("productModal").classList.add("hidden");
}

function renderImages() {
  const container = document.getElementById("modalImages");
  container.innerHTML = "";
  modalImages.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "w-full h-72 md:h-96 object-contain flex-shrink-0 p-4";
    container.appendChild(img);
  });
  container.style.transform = `translateX(-${currentImageIndex * 100}%)`;
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % modalImages.length;
  renderImages();
}

function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + modalImages.length) % modalImages.length;
  renderImages();
}

// ✅ Attach event listeners after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-product]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productKey = btn.getAttribute("data-product");
      const title = btn.getAttribute("data-title");

      // Pick product-specific images OR fallback to placeholders
      const images = productImages[productKey] || placeholderImages;

      openModal(title, images, longDescriptions[productKey]);
    });
  });
});


  //form 

   const form = document.getElementById("enquiryForm");
  const formMessage = document.getElementById("formMessage");
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Change button state

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();

        // Show success message

        formMessage.className = "block text-green-300 bg-green-900/40 p-3 rounded-xl mt-4";
        formMessage.innerHTML = "✅ Thank you! Your enquiry has been submitted successfully.";
      } else {

        // Show error message

        formMessage.className = "block text-red-300 bg-red-900/40 p-3 rounded-xl mt-4";
        formMessage.innerHTML = "❌ Oops! Something went wrong. Please try again.";
      }
    } catch (error) {
      formMessage.className = "block text-red-300 bg-red-900/40 p-3 rounded-xl mt-4";
      formMessage.innerHTML = "⚠️ Network error. Please check your connection.";
    }

    // Reset button state
    
    submitBtn.disabled = false;
    submitBtn.innerText = "Send Message";
  });

