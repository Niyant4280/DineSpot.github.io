document.getElementById('people').addEventListener('input', function () {
    const pricePerPerson = 500; // Price per person
    const people = parseInt(this.value) || 0;
    const totalCost = people * pricePerPerson;

    document.getElementById('total-cost').textContent = `₹${totalCost}`;
});

document.getElementById('reservation-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const reservationDetails = {
        date: formData.get('date'),
        time: formData.get('time'),
        people: formData.get('people'),
        totalCost: document.getElementById('total-cost').textContent,
        restaurant: new URLSearchParams(window.location.search).get('restaurant'),
    };

    localStorage.setItem('reservationDetails', JSON.stringify(reservationDetails));
    window.location.href = 'payment.html';
});
