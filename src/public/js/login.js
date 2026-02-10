async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.message);
        return;
    }

    // VERY IMPORTANT
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", String(data.id));

    window.location.href = "/pages/movies.html";
}
