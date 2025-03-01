document.addEventListener("DOMContentLoaded", function() {
    // Fetch the navbar HTML and insert it into the index.html
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);

            // Add event listener to the hamburger menu after the navbar is loaded
            const hamburger = document.querySelector('.hamburger');
            const navList = document.getElementById('nav-list');

            hamburger.addEventListener('click', function() {
                navList.classList.toggle('active');
            });
        })
        .catch(error => console.error('Error loading navbar:', error));
});
