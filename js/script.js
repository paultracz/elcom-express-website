// script.js

// Select the menu toggle button and navigation links container
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Add event listener to toggle the 'nav-active' class for mobile menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    
    if (navLinks.classList.contains('nav-active')) {
        menuToggle.textContent = '✖';  // Change to 'X' symbol when open
    } else {
        menuToggle.textContent = '☰';  // Change to hamburger icon when closed
    }
});

// Close the mobile menu if a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            menuToggle.textContent = '☰'; // Reset icon to hamburger
        }
    });
});

// Add a resize event listener to handle layout changes gracefully
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('nav-active')) {
        navLinks.classList.remove('nav-active');
        menuToggle.textContent = '☰'; // Reset icon to hamburger
    }
});

// Handle form submission
// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const formData = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            message: form.message.value,
        };

        try {
            // Send form data to the backend
            const response = await fetch("http://127.0.0.1:5001/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Message sent successfully!");
                form.reset(); // Clear form fields
            } else {
                alert("Error sending message. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("There was an error. Please try again.");
        }
    });
});

