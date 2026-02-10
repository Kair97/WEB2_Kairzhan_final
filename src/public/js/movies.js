const myUserId = String(localStorage.getItem("userId"));

async function loadMovies() {
    const res = await fetch(`${API_BASE}/movies`);
    const movies = await res.json();

    const container = document.getElementById("movies");
    container.innerHTML = "";

    movies.forEach(m => {
        let deleteBtn = "";

        if (m.createdBy && String(m.createdBy._id) === myUserId) {
            deleteBtn = `<button onclick="deleteMovie('${m._id}')">Delete</button>`;
        }

        container.innerHTML += `
            <div class="card">
                <h3>${m.title}</h3>
                <p>${m.description}</p>
                <a href="single-movie.html?id=${m._id}">View</a>
                ${deleteBtn}
            </div>
        `;
    });
}

async function createMovie() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const trailerUrl = document.getElementById("trailer").value;

    const res = await fetchWithAuth(`${API_BASE}/movies`, {
        method: "POST",
        body: JSON.stringify({ title, description, trailerUrl })
    });

    const data = await res.json();

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("trailer").value = "";

    if (!res.ok) {
        alert(data.message);
        return;
    }

    loadMovies();
}

async function deleteMovie(movieId) {
    if (!confirm("Delete this movie?")) return;

    const res = await fetchWithAuth(`${API_BASE}/movies/${movieId}`, {
        method: "DELETE"
    });

    const data = await res.json();
    alert(data.message);
    loadMovies();
}

loadMovies();
