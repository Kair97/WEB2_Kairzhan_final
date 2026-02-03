# 🎬 Movie API (Web2 Final Project)

## 📌 Project Overview
This project is a backend REST API for a Movie Website.  
Users can register, log in, add movies, write reviews, rate movies, and view ratings and comments.

The API is built using **Node.js**, **Express.js**, and **MongoDB** and follows a clean modular structure.

---

## 🛠 Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcryptjs (Password hashing)
- Validator.js (Input validation)
- Axios (External API requests)
- OMDb API (Movie information)

---

## 📁 Project Structure
src/
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── userController.js
│ ├── movieController.js
│ └── reviewController.js
├── middleware/
│ ├── authMiddleware.js
│ └── errorMiddleware.js
├── models/
│ ├── User.js
│ ├── Movie.js
│ └── Review.js
├── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
│ ├── movieRoutes.js
│ └── reviewRoutes.js
├── app.js
└── server.js


---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
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

http://localhost:5000
🔐 Authentication
JWT is used for authentication.
Protected routes require a token in headers:

Authorization: Bearer <token>
Passwords are securely hashed using bcrypt.

📌 API Documentation
🔑 Auth Routes (Public)
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
👤 User Routes (Private)
Method	Endpoint	Description
GET	/api/users/profile	Get user profile
🎬 Movie Routes
Method	Endpoint	Access	Description
POST	/api/movies	Private	Create movie
GET	/api/movies	Public	Get all movies
GET	/api/movies/:id	Public	Get movie by ID
PUT	/api/movies/:id	Private	Update movie
DELETE	/api/movies/:id	Private	Delete movie
⭐ Review Routes
Method	Endpoint	Access	Description
POST	/api/reviews/:movieId	Private	Add review
GET	/api/reviews/:movieId	Public	Get movie reviews
🌍 External API (OMDb)
Method	Endpoint	Description
GET	/api/movies/external/search?title=Inception	Search movie
GET	/api/movies/external/search?genre=Action	Search by genre
⭐ Features
User authentication with JWT

Movie CRUD operations

Reviews and ratings (1–5 stars)

One review per user per movie

Average movie rating calculation

External API integration (OMDb)

Global error handling

Input validation

🚀 Deployment
The project can be deployed on platforms like Render, Railway, or Replit.
Environment variables are used to store sensitive data.

👨‍🎓 Author
Student: Orynbek Kairzhan
Course: Web2
Project Type: Final Project