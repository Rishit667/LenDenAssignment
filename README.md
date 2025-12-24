# LenDenAssignment

# Secure User Profile & Access Control System  
Assignment 1 – Full Stack Development (GET 2026)

This project is a complete user identity and profile management system.  
It includes protected APIs, encrypted sensitive data storage, and a frontend that interacts securely with the backend. 

##  Project Summary

The application allows users to register, log in, and view their profile information in a secure environment.  
Key capabilities include:
- Token-based authentication (JWT)
- AES-256 encryption for the Aadhaar number before saving to the database
- A protected profile endpoint that decrypts Aadhaar only when a valid user requests it
- A React-based interface for signup, login, and viewing user details
- Error handling on both backend and frontend for invalid actions
- Documented use of AI tools during development 

#  Technology Used

# Backend
- Node.js + Express
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- AES-256 encryption for sensitive data

# Frontend
- React
- React Router
- Axios for API communication
- Tailwind CSS


#  Project Setup

### 1. Clone the repository

git clone repo
cd repo

## backend 

cd backend
npm install
create an env file and add this :
- PORT=5353
- MONGO_URI=mongodb+srv://rishitmapure_db_user:i3aMz4H36tiKvxNI@cluster0.mzkjnvd.mongodb.net/? appName=Cluster0
- JWT_SECRET=dayqopiwytd218727gwaqi-0129ywqi-1yu
- AADHAR_SECRET_KEY=12345678901234567890123456789012

##

##  Dependencies

This project uses the following libraries and frameworks:

---

#  Backend Dependencies (Node.js + Express)

| Package | Purpose |
|--------|---------|
| express | Web framework for building APIs |
| mongoose | MongoDB ODM for database models |
| dotenv | Loads environment variables from `.env` |
| jsonwebtoken | Generates and verifies JWT tokens |
| bcryptjs | Hashing passwords |
| crypto | AES-256 encryption/decryption |
| cors | Enables cross-origin requests |
| nodemon (dev) | Auto restarts server during development |

Install them with:
bash
npm install express mongoose dotenv jsonwebtoken bcryptjs cors


npm start

## frontend
cd ../frontend
npm install

create env file and add :
- VITE_BASE_URL=http://localhost:5353


#dependencies

 "tailwindcss/vite": "^4.1.18",
    "axios": "^1.13.2",
    "dotenv": "^17.2.3",
    "lucide-react": "^0.562.0",
    "react-router-dom": "^7.11.0



##  API Documentation

Below are the core API endpoints used in the project.

---

###  POST /api/auth/register
Creates a new user account.

**Description:**  
- Encrypts the Aadhaar number before saving  
- Stores hashed password  
- Returns a JWT token on success  

**Request Body:**
json
{
  "username": "Rishit",
  "email": "abc@example.com",
  "password": "123456",
  "age": 21,
  "address": "Mumbai",
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "phoneNo": 8234567890,
  "AadharNo": "802614865267"
}

POST /api/auth/login
request body :
{
  "email": "abc@example.com",
  "password": "123456"
}


GET /api/user/profile
Returns the logged-in user's profile with decrypted Aadhaar number.
succssfull response 
{
  "username": "Rishit",
  "email": "abc@example.com",
  "age": 21,
  "address": "Mumbai",
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "phoneNo": 8234567890,
  "AadharNo": "802614865267"
}


---

## Database Schema 

The project uses a single `User` collection/table.  
Sensitive fields like Aadhaar are stored **AES-256 encrypted**.

---

### **User Schema Structure**

| Field        | Type     | Description |
|--------------|----------|-------------|
| username     | String   | Full name of the user |
| email        | String   | Unique email used for login |
| password     | String   | Hashed using bcrypt |
| age          | Number   | User’s age |
| address      | String   | Full address |
| city         | String   | City name |
| state        | String   | State name |
| country      | String   | Country name |
| phoneNo      | Number   | Contact number |
| AadharNo     | String   | **AES-256 encrypted** Aadhaar number |
| createdAt    | Date     | Timestamp (auto-generated) |

---

### **Data Flow Summary**
1. User sends Aadhaar number in registration request.  
2. Backend encrypts Aadhaar using AES-256.  
3. Encrypted value gets stored in the database.  
4. When profile is fetched, backend decrypts Aadhaar before sending response.  
5. Only authenticated users with a valid JWT token can fetch their profile.

---


##  AI Tool Usage Log

During the development of this project, AI tools (ChatGPT / Perplexity) were used to speed up certain tasks and assist with debugging.  
Below is a detailed breakdown of where AI contributed.

---

### **AI-Assisted Tasks**

1. **Backend Utilities**
   - Helped generate the initial AES encryption and decryption helper functions.
   - Assisted in writing the JWT verification middleware structure.
   - Suggested improvements for Express error-handling patterns.

2. **Frontend Components**
   - Assisted in structuring the React Dashboard layout.
   - Helped debug Axios configuration issues (headers + token handling).
   - Suggested conditional rendering patterns for loading and error states.

3. **Bug Fixing**
   - Helped identify issues with CORS configuration.
   - Provided solutions for resolving 400/401 errors during login & protected route access.

5. **Documentation**
   - Assisted in outlining the README structure.
   - Provided guidance for writing API documentation and setup instructions.

---

##  Effectiveness Score: **4.5 / 5**

### **Justification:**
AI tools significantly reduced the time required for repetitive coding tasks, setup, and debugging.  
Most of the generated code required light adjustments, but the guidance improved development efficiency and organization.  
Overall, AI provided strong support while still allowing full manual control over the final implementation.

---