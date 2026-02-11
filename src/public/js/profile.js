async function loadProfile() {
    try {
        const res = await fetchWithAuth(`${API_BASE}/users/profile`);
        
        if (!res.ok) {
            throw new Error("Failed to load profile");
        }

        const user = await res.json();

        document.getElementById("username").value = user.username;
        document.getElementById("email").value = user.email;
    } catch (error) {
        console.error("Error loading profile:", error);
        alert("Failed to load profile.");
    }
}

async function updateProfile() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const body = { username, email };
    
    if (password) {
        body.password = password;
    }

    try {
        const res = await fetchWithAuth(`${API_BASE}/users/profile`, {
            method: "PUT",
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Failed to update profile");
            return;
        }

        document.getElementById("password").value = "";

        alert("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
    }
}

loadProfile();