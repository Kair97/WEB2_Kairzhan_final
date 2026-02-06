🎬 Movie API (Web2 Final Project)
📌 Project Overview

This project is a backend REST API for a Movie Website.
Users can register, log in, create movies, write reviews, rate movies, and view ratings and comments.

The API is built using Node.js, Express.js, and MongoDB, following a clean and modular architecture.

🛠 Technologies Used

Node.js

Express.js

MongoDB

Mongoose

JWT (Authentication)

bcryptjs (Password hashing)

Validator.js (Input validation)

Axios (External API requests)

OMDb API (External movie information)

📁 Project Structure
src/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── movieController.js
│   └── reviewController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── User.js
│   ├── Movie.js
│   └── Review.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── movieRoutes.js
│   └── reviewRoutes.js
├── app.js
└── server.js

⚙️ Setup & Installation
1️⃣ Clone the repository
git clone <your-repo-link>
cd movie-app

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/movie_api
JWT_SECRET=your_secret_key
OMDB_API_KEY=your_omdb_api_key

4️⃣ Run the server
npm run dev


Server will start on:
👉 http://localhost:5000

🔐 Authentication

JWT is used for user authentication

Protected routes require a token in headers:

Authorization: Bearer <token>


Passwords are securely hashed using bcrypt

📌 API Documentation
🔑 Auth Routes (Public)
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
👤 User Routes (Private)
Method	Endpoint	Description
GET	/api/users/profile	Get logged-in user profile
PUT	/api/users/profile	Update user profile (username, email, password)
🎬 Movie Routes
Method	Endpoint	Access	Description
POST	/api/movies	Private	Create a new movie
GET	/api/movies	Public	Get all movies
GET	/api/movies/:id	Public	Get movie by ID
PUT	/api/movies/:id	Private	Update movie (only creator)
DELETE	/api/movies/:id	Private	Delete movie (only creator)
⭐ Review Routes
Method	Endpoint	Access	Description
POST	/api/reviews/:movieId	Private	Add a review to a movie
GET	/api/reviews/:movieId	Public	Get reviews for a movie

Rating range: 1–10

One review per user per movie

🌍 External API (OMDb)
Method	Endpoint	Description
GET	/api/movies/external/search?title=Inception	Search movie by title
⭐ Features

User authentication with JWT

Secure password hashing

Movie CRUD operations

Reviews and ratings (1–10)

One review per user per movie

Average movie rating calculation

External movie data via OMDb API

Global error handling middleware

Input validation

🚀 Deployment

The project can be deployed on platforms like Render, Railway, or Replit.
All sensitive data is stored using environment variables.

👨‍🎓 Author

Student: Orynbek Kairzhan
Course: Web2
Project Type: Final Project