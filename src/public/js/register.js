async function register() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
        alert("Please fill in all fields");
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Registration failed");
            return;
        }

        alert("Registered successfully! Please login.");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
    }
}