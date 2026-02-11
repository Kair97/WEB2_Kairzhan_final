const myUserId = getUserId();

async function loadMovies() {
    try {
        const res = await fetch(`${API_BASE}/movies`);
        
        if (!res.ok) {
            throw new Error("Failed to load movies");
        }

        const movies = await res.json();

        const container = document.getElementById("movies");
        container.innerHTML = "";

        if (movies.length === 0) {
            container.innerHTML = '<div class="alert alert-light border">No movies yet. Create the first one!</div>';
            return;
        }

        movies.forEach(m => {
            let actionButtons = '';

            if (m.createdBy && m.createdBy._id === myUserId) {
                actionButtons = `
                    <a href="single-movie.html?id=${m._id}" class="btn btn-sm btn-outline-dark me-2">Edit</a>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteMovie('${m._id}')">Delete</button>
                `;
            } else {
                actionButtons = `<a href="single-movie.html?id=${m._id}" class="btn btn-sm btn-outline-dark">View Details</a>`;
            }

            container.innerHTML += `
                <div class="card border-0 shadow-sm mb-3">
                    <div class="card-body">
                        <h5 class="card-title fw-bold mb-2">${m.title}</h5>
                        <p class="card-text text-muted mb-2">${m.description}</p>
                        <p class="text-muted small mb-3">By ${m.createdBy?.username || 'Unknown'}</p>
                        ${actionButtons}
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading movies:", error);
        alert("Failed to load movies. Please try again.");
    }
}

async function createMovie() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const trailerUrl = document.getElementById("trailer").value;

    if (!title || !description) {
        alert("Title and description are required");
        return;
    }

    try {
        const res = await fetchWithAuth(`${API_BASE}/movies`, {
            method: "POST",
            body: JSON.stringify({ title, description, trailerUrl })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Failed to create movie");
            return;
        }

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("trailer").value = "";

        alert("Movie created successfully!");
        loadMovies();
    } catch (error) {
        console.error("Error creating movie:", error);
        alert("Failed to create movie. Please try again.");
    }
}

async function deleteMovie(movieId) {
    if (!confirm("Are you sure you want to delete this movie?")) {
        return;
    }

    try {
        const res = await fetchWithAuth(`${API_BASE}/movies/${movieId}`, {
            method: "DELETE"
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Failed to delete movie");
            return;
        }

        alert("Movie deleted successfully!");
        loadMovies();
    } catch (error) {
        console.error("Error deleting movie:", error);
        alert("Failed to delete movie. Please try again.");
    }
}

loadMovies();