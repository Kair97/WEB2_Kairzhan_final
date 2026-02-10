const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const myUserId = String(localStorage.getItem("userId"));

async function loadMovie() {
    const res = await fetch(`${API_BASE}/movies/${movieId}`);
    const data = await res.json();

    const movie = data.movie;

    document.getElementById("movie").innerHTML = `
        <h2>${movie.title}</h2>
        <p>${movie.description}</p>
        <p>Rating: ${data.averageRating}</p>
    `;

    // Show edit form ONLY for owner
    if (movie.createdBy && String(movie.createdBy._id) === myUserId) {
        document.getElementById("editMovie").style.display = "block";
        document.getElementById("editTitle").value = movie.title;
        document.getElementById("editDescription").value = movie.description;
        document.getElementById("editTrailer").value = movie.trailerUrl || "";
    }

    loadReviews();
}

async function updateMovie() {
    const title = document.getElementById("editTitle").value;
    const description = document.getElementById("editDescription").value;
    const trailerUrl = document.getElementById("editTrailer").value;

    const res = await fetchWithAuth(`${API_BASE}/movies/${movieId}`, {
        method: "PUT",
        body: JSON.stringify({ title, description, trailerUrl })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.message);
        return;
    }

    alert("Movie updated");
    loadMovie();
}

async function loadReviews() {
    const res = await fetch(`${API_BASE}/reviews/${movieId}`);
    const reviews = await res.json();

    const container = document.getElementById("reviews");
    container.innerHTML = "";

    reviews.forEach(r => {
        let deleteBtn = "";

        if (r.user && String(r.user._id) === myUserId) {
            deleteBtn = `<button onclick="deleteReview('${r._id}')">Delete</button>`;
        }

        container.innerHTML += `
            <div class="card">
                <b>${r.user.username}</b>
                <p>${r.rating}/10</p>
                <p>${r.comment}</p>
                ${deleteBtn}
            </div>
        `;
    });
}

async function addReview() {
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    const res = await fetchWithAuth(`${API_BASE}/reviews/${movieId}`, {
        method: "POST",
        body: JSON.stringify({ rating, comment })
    });

    if (!res.ok) {
        const data = await res.json();
        alert(data.message);
        return;
    }

    loadReviews();
}

async function deleteReview(reviewId) {
    if (!confirm("Delete this review?")) return;

    const res = await fetchWithAuth(`${API_BASE}/reviews/${reviewId}`, {
        method: "DELETE"
    });

    const data = await res.json();
    alert(data.message);
    loadReviews();
}

loadMovie();
