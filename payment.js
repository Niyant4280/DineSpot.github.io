document.addEventListener('DOMContentLoaded', function () {
    const reservationDetails = JSON.parse(localStorage.getItem('reservationDetails'));
    const summaryDiv = document.getElementById('reservation-summary');

    // Display reservation details
    summaryDiv.innerHTML = `
        <p><strong>Restaurant:</strong> ${reservationDetails.restaurant}</p>
        <p><strong>Date:</strong> ${reservationDetails.date}</p>
        <p><strong>Time:</strong> ${reservationDetails.time}</p>
        <p><strong>Number of People:</strong> ${reservationDetails.people}</p>
        <p><strong>Total Cost:</strong> ${reservationDetails.totalCost}</p>
    `;

    // Handle payment form submission
    document.getElementById('payment-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

        alert(`Reservation confirmed!\n\nRestaurant: ${reservationDetails.restaurant}\nDate: ${reservationDetails.date}\nTime: ${reservationDetails.time}\nNumber of People: ${reservationDetails.people}\nTotal Cost: ${reservationDetails.totalCost}\nPayment Method: ${paymentMethod}`);

        // Clear reservation details from localStorage
        localStorage.removeItem('reservationDetails');

        // Redirect to the homepage or another confirmation page
        window.location.href = 'cafe.html';
    });
});
