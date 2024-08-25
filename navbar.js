// common.js
document.addEventListener("DOMContentLoaded", function() {
    // Fetch and insert the navbar from navlist.html
    fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);
        
        // Attach the toggleMenu function after navbar is loaded
        const hamburger = document.querySelector('.hamburger');
        hamburger.addEventListener('click', toggleMenu);
    })
    .catch(error => console.error('Error fetching navlist.html:', error));
});

// Function to toggle the menu visibility on mobile
function toggleMenu() {
    const navList = document.getElementById('nav-list');
    navList.classList.toggle('active');
}
