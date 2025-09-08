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

 function toggleReadMore(button) {
    const hiddenContent = button.nextElementSibling;
    hiddenContent.classList.toggle("hidden");
    button.textContent = hiddenContent.classList.contains("hidden") 
      ? "Read More" 
      : "Read Less";
  }

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

