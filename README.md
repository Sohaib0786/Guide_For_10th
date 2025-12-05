🎓 Guide For 10th
-------------------

A MERN stack web application designed to help 10th-class students choose the right career path.
The platform provides AI-powered guidance using Google Gemini, personalized recommendations, and a simple, user-friendly interface.

Features
----------
 =>Authentication

1.User Registration & Login
2.Password hashing (bcrypt)
3.JWT-based authentication
4.Cookies for session handling

AI Career Guidance
--------------------
1.Integrated Google Gemini API
2.Personalized suggestions based on student interests.
3.Smooth UI to get instant career paths

Career Streams Covered
-----------------------
1.Science (PCM / PCB)
2.Commerce
3.Arts / Humanities
4.Vocational paths
5.Diploma paths
6.Skill-oriented future-ready recommendations

Backend (Node.js + Express)
----------------------------
1.Fully modular folder structure
2.MongoDB database connection
3.Secure token generation
4.Student model + controllers
5.Gemini AI service integration


Tech Stack
-----------
Frontend
-----
-> React.js
->Context API
->Tailwind CSS
->Axios

Backend
-------
->Node.js
->Express.js
->MongoDB + Mongoose
->JWT
->Google Gemini

Environment Variables
=======================

Create a .env file in the backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_key_here
