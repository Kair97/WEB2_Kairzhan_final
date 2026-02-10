async function loadProfile() {
    const res = await fetchWithAuth(`${API_BASE}/users/profile`);
    const user = await res.json();

    document.getElementById("username").value = user.username;
    document.getElementById("email").value = user.email;
}

async function updateProfile() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetchWithAuth(`${API_BASE}/users/profile`, {
        method: "PUT",
        body: JSON.stringify({username, email, password})
    });

    const data = await res.json();
    alert(data.message);
}

loadProfile();
