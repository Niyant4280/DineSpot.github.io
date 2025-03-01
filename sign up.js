document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("fullName").value.trim(); // ✅ Changed from fullName to username
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }), // ✅ Fixed key name
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert(data.error || "Signup failed!");
        }
    } catch (error) {
        console.error("Signup Error:", error);
        alert("An error occurred. Please try again.");
    }
});
