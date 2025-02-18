function displayUsername() {
    const username = localStorage.getItem("loggedInUser") || "Welcome!";
    document.getElementById("welcome-text").textContent = `Welcome! ${username === "Welcome!" ? "" : username}`;
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
    document.getElementById("welcome-text").textContent = `Welcome!'}`;
}

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

window.onload = displayUsername;

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const users = JSON.parse(localStorage.getItem("users")) || {};
    
    if (username === "admin" && password === "admin123") {
        localStorage.setItem("loggedInUser", "Admin");
        window.location.href = "admin.html";
    } else if (users[username] && users[username] === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials! Please try again or sign up.");
    }
}

function signUp() {
    const newUsername = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;
    
    if (newUsername && newPassword) {
        let users = JSON.parse(localStorage.getItem("users")) || {};
        
        if (users[newUsername]) {
            alert("Username already exists! Try another.");
        } else {
            users[newUsername] = newPassword;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Sign-up successful! You can now log in.");
            showLogin();
        }
    } else {
        alert("Please enter valid details.");
    }
}

function showSignUp() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("signup-container").style.display = "block";
}

function showLogin() {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("signup-container").style.display = "none";
}

function filterRooms() {
    let selectedType = document.getElementById("roomType").value;
    let maxPrice = parseInt(document.getElementById("priceRange").value);
    let breakfastChecked = document.getElementById("breakfast").checked;
    let petsChecked = document.getElementById("pets").checked;
    let rooms = document.querySelectorAll(".room-card");

    rooms.forEach(room => {
        let roomPrice = parseInt(room.getAttribute("data-price"));
        let hasBreakfast = room.getAttribute("data-breakfast") === "true";
        let allowsPets = room.getAttribute("data-pets") === "true";

        let typeMatch = selectedType === "all" || room.classList.contains(selectedType);
        let priceMatch = roomPrice <= maxPrice;
        let breakfastMatch = !breakfastChecked || hasBreakfast;
        let petsMatch = !petsChecked || allowsPets;

        if (typeMatch && priceMatch && breakfastMatch && petsMatch) {
            room.style.display = "block";
        } else {
            room.style.display = "none";
        }
    });
}

document.getElementById("roomType").addEventListener("change", filterRooms);
document.getElementById("priceRange").addEventListener("input", function () {
    document.getElementById("priceValue").innerText = this.value;
    filterRooms();
});
document.getElementById("breakfast").addEventListener("change", filterRooms);
document.getElementById("pets").addEventListener("change", filterRooms);