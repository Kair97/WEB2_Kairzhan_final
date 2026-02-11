const API_BASE = "http://localhost:5000/api";

function getToken() {
    return localStorage.getItem("token");
}

function setToken(token) {
    localStorage.setItem("token", token);
}

function getUserId() {
    return localStorage.getItem("userId");
}

function setUserId(userId) {
    localStorage.setItem("userId", userId);
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/pages/login.html";
}

async function fetchWithAuth(url, options = {}) {
    const token = getToken();
    if (!token) {
        window.location.href = "/pages/login.html";
        return;
    }

    return fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`
        }
    });
}