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
fetch("http://localhost:5000/reserve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "John Doe",
      date: "2025-03-01",
      time: "7:00 PM",
      guests: 4
    })
  })
  .then(response => response.json())
  .then(data => console.log("Reservation added:", data))
  .catch(error => console.error("Error:", error));
  
  