// Import Firebase services
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Initialize Firebase
const auth = getAuth();
const db = getFirestore();

// Fetch user details
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Update UI with basic user details
        document.getElementById("username").innerText = user.displayName || "User";
        document.getElementById("userEmail").innerText = user.email;
        document.getElementById("profileImage").src = user.photoURL || "default-user.png";

        // Fetch additional details from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            document.getElementById("userFullName").innerText = userDoc.data().name;
            document.getElementById("userPhone").innerText = userDoc.data().phone || "N/A";
        } else {
            console.log("No additional user data found in Firestore");
        }
    } else {
        window.location.href = "login.html"; // Redirect if user is not logged in
    }
});

// Logout function
function logoutUser() {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Logout failed:", error.message);
    });
}
