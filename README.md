# Scheduler Backend

Node.js + Express backend for a simple appointment booking SaaS.  
It provides API endpoints to create and list bookings, and connects to a MongoDB Atlas database.

Live API:  
- Base URL: `https://scheduler-backend-qhdh.onrender.com`
- Get all bookings: `GET /bookings`
- Create booking: `POST /book`

Frontend (live):  
- `https://scheduler-frontend-kappa.vercel.app/`

---

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Render (hosting)

---

## Project Structure

```text
backend/
  index.js          # Express app and routes
  models/
    Booking.js      # Mongoose Booking model
  package.json
  .env              # (not committed) contains MONGO_URI
