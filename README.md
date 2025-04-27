 URL Shortener and QR Code Generator
A full-stack application to generate shortened URLs, create QR codes from URLs, and track user analytics.
Built with a modern tech stack including React, TailwindCSS, Node.js, Express.js, and MongoDB.

🚀 Features
✂️ Shorten Long URLs — instantly create a short, shareable link.

📷 Generate QR Codes — create QR codes for any URL.

📊 User Analytics — track clicks and visits for each short URL.

🔒 Authentication (optional) — manage URL history and analytics per user.

⚡ Fast and Responsive frontend with React and TailwindCSS.

🛠️ Tech Stack
Frontend:
React.js

JavaScript

HTML5

TailwindCSS

Backend:
Node.js

Express.js

Database:
MongoDB (with Mongoose ODM)

🏗️ Project Structure
bash
Copy
Edit
/client          → Frontend (React)
/api             → Backend (Node.js + Express)
/api/models      → MongoDB models (ShortURL, Analytics, User)
/api/controllers → Backend business logic
/api/routes      → API endpoints
📦 Installation and Setup
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/url-shortener-project.git
cd url-shortener-project
Setup Backend

bash
Copy
Edit
cd api
npm install
Create a .env file inside /api and add your MongoDB URI and other configs:

dotenv
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
Setup Frontend

bash
Copy
Edit
cd client
npm install
npm run dev
Run Backend Server

bash
Copy
Edit
cd api
npm run dev
Access the app

Open http://localhost:3000 in your browser.

🔗 API Endpoints

Method	Endpoint	Description
POST	/api/shorten	Create a short URL
GET	/api/:shortId	Redirect to the original URL
GET	/api/analytics/:shortId	Fetch analytics data
POST	/api/qrcode	Generate QR Code for a given URL
📊 Database Tables / Collections
users →  Stores user info if authentication is implemented.

urls → Stores original URLs, short IDs, and associated user IDs.

analytics → Stores click counts, timestamps, and other tracking data.
