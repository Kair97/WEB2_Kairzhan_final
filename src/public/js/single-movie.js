const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const myUserId = getUserId();

if (!movieId) {
    alert("No movie specified");
    window.location.href = "/pages/movies.html";
}

async function loadMovie() {
    try {
        const res = await fetch(`${API_BASE}/movies/${movieId}`);
        
        if (!res.ok) {
            throw new Error("Movie not found");
        }

        const data = await res.json();
        const movie = data.movie;

        document.getElementById("movieDetails").innerHTML = `
            <h3 class="fw-bold mb-3">${movie.title}</h3>
            <p class="mb-2"><strong>Description:</strong> ${movie.description}</p>
            ${movie.trailerUrl ? `<p class="mb-2"><strong>Trailer:</strong> <a href="${movie.trailerUrl}" target="_blank" class="text-dark">${movie.trailerUrl}</a></p>` : ''}
            <p class="mb-2"><strong>Average Rating:</strong> ${data.averageRating || 'No ratings'}/10</p>
            <p class="mb-2"><strong>Total Reviews:</strong> ${data.reviewsCount || 0}</p>
            <p class="text-muted small mb-0">Created by ${movie.createdBy?.username || 'Unknown'}</p>
        `;

        if (movie.createdBy && movie.createdBy._id === myUserId) {
            document.getElementById("editMovie").style.display = "block";
            document.getElementById("editTitle").value = movie.title;
            document.getElementById("editDescription").value = movie.description;
            document.getElementById("editTrailer").value = movie.trailerUrl || "";
        }

        loadReviews();
    } catch (error) {
        console.error("Error loading movie:", error);
        alert("Failed to load movie.");
    }
}

async function updateMovie() {
    const title = document.getElementById("editTitle").value;
    const description = document.getElementById("editDescription").value;
    const trailerUrl = document.getElementById("editTrailer").value;

    if (!title || !description) {
        alert("Title and description are required");
        return;
    }

    try {
        const res = await fetchWithAuth(`${API_BASE}/movies/${movieId}`, {
            method: "PUT",
            body: JSON.stringify({ title, description, trailerUrl })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Failed to update movie");
            return;
        }

        alert("Movie updated successfully!");
        loadMovie();
    } catch (error) {
        console.error("Error updating movie:", error);
        alert("Failed to update movie.");
    }
}

async function loadReviews() {
    try {
        const res = await fetch(`${API_BASE}/reviews/${movieId}`);
        
        if (!res.ok) {
            throw new Error("Failed to load reviews");
        }

        const reviews = await res.json();

        const container = document.getElementById("reviews");
        container.innerHTML = "";

        if (reviews.length === 0) {
            container.innerHTML = '<div class="alert alert-light border">No reviews yet. Be the first!</div>';
            return;
        }

        reviews.forEach(r => {
            let deleteBtn = "";

            if (r.user && r.user._id === myUserId) {
                deleteBtn = `<button class="btn btn-sm btn-outline-danger mt-2" onclick="deleteReview('${r._id}')">Delete</button>`;
            }

            container.innerHTML += `
                <div class="card border-0 shadow-sm mb-3 review-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <strong>${r.user?.username || 'Anonymous'}</strong>
                            <span class="badge bg-dark">${r.rating}/10</span>
                        </div>
                        <p class="mb-2">${r.comment}</p>
                        <small class="text-muted">${new Date(r.createdAt).toLocaleDateString()}</small>
                        ${deleteBtn}
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading reviews:", error);
    }
}

async function addReview() {
    const rating = parseInt(document.getElementById("rating").value);
    const comment = document.getElementById("comment").value;

    if (!rating || !comment) {
        alert("Please provide both rating and comment");
        return;
    }

    if (rating < 1 || rating > 10) {
        alert("Rating must be between 1 and 10");
        return;
    }

    try {
        const res = await fetchWithAuth(`${API_BASE}/reviews/${movieId}`, {
            method: "POST",
            body: JSON.stringify({ rating, comment })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Failed to add review");
            return;
        }

        document.getElementById("rating").value = "";
        document.getElementById("comment").value = "";

        alert("Review added successfully!");
        loadMovie();
    } catch (error) {
        console.error("Error adding review:", error);
        alert("Failed to add review.");
    }
}

async function deleteReview(reviewId) {
    if (!confirm("Are you sure you want to delete this review?")) {
        return;
    }

    try {
        const res = await fetchWithAuth(`${API_BASE}/reviews/${reviewId}`, {
            method: "DELETE"
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Failed to delete review");
            return;
        }

        alert("Review deleted successfully!");
        loadMovie();
    } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review.");
    }
}

loadMovie();