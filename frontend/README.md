🏠 Real Estate Property Listing Platform
A full-stack MERN (MongoDB, Express.js, React.js, Node.js) property listing platform with dynamic features like listing display, property detail views, filtering, image sliders, owner info, comments, and booking options.

📸 Preview

📚 Features
🔍 Filter properties by bedrooms, country, search keywords

🏡 View property details with image carousel & metadata

✨ Frontend & backend listings (merged seamlessly)

🆕 Newly added properties marked as "New"

🖼️ Image carousel using Swiper.js

🧠 Smart filtering with normalized strings

🧾 Description toggling with animation

💬 Comment system (Add/View)

🔒 Owner info protected

📅 Booking initiation (UI flow)

🌍 Responsive & modern UI with TailwindCSS

🎥 Smooth animations via Framer Motion

🔄 Axios instance context for easy API usage

🚀 Tech Stack
Tech	Role
React	Frontend SPA
Node.js	Backend runtime
Express.js	Backend server
MongoDB	Database for listings & comments
Mongoose	ODM for MongoDB
Swiper.js	Property image carousel
Tailwind CSS	Styling + responsive layout
Framer Motion	Animation effects
React Router	Routing for dynamic pages
Axios	HTTP client with context provider
Multer	For image uploads (backend)

🛠️ Folder Structure
pgsql
Copy
Edit
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── uploads/            # Uploaded images
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── App.jsx
├── public/
├── package.json
├── README.md
📦 Installation
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/real-estate-platform.git
cd real-estate-platform
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
Create a .env file:

env
Copy
Edit
PORT=4000
MONGODB_URI=your_mongodb_connection_string
Start backend server:

bash
Copy
Edit
npm start
3. Setup Frontend
bash
Copy
Edit
cd frontend
npm install
Start frontend:

bash
Copy
Edit
npm run dev
🔌 API Endpoints (Backend)
Endpoint	Method	Description
/listing/all-listings	GET	Get all listings
/listing/get-property	GET	Get property list (for matching)
/comments/:propertyId	POST	Post a comment
/comments/get-comments/:id	GET	Fetch comments for property

🧪 Sample Property Data
Mock data is available for frontend rendering via zillowData in assets/assets.js.

✅ Includes 20+ property entries with high-quality Unsplash images.

🖼️ Image Uploads
Images are uploaded via Multer and stored in backend/uploads/.

URLs are served as: http://localhost:4000/uploads/filename.jpg

✅ To Do / Ideas
 Booking form with calendar

 Admin dashboard

 Email notifications

 Property reviews & ratings

 Wishlist/favorites

 Google Maps integration

🤝 Contributing
Pull requests and stars are welcome! Please fork the