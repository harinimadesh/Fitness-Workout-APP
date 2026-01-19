import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    role: "user",
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    specialization: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Inside Register.js - handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // 1. Get this URL from your Render Dashboard (e.g., https://fitness-app-backend.onrender.com)
    // 2. Make sure there is NO trailing slash at the end of the base URL
    const API_BASE_URL = "https://your-actual-app-name.onrender.com"; 
    
    // This combines to: https://your-actual-app-name.onrender.com/api/users
    await axios.post(`${API_BASE_URL}/api/users`, form);

    alert("Registered successfully! Please login.");
    navigate("/"); 
  } catch (err) {
    // ... error handling
  }
};
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "20px auto" }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>

          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />

          {form.role === "user" ? (
            <>
              <label>Age</label>
              <input type="number" name="age" value={form.age} onChange={handleChange} />
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
              <label>Height (cm)</label>
              <input type="number" name="height" value={form.height} onChange={handleChange} />
              <label>Weight (kg)</label>
              <input type="number" name="weight" value={form.weight} onChange={handleChange} />
            </>
          ) : form.role === "trainer" ? (
            <>
              <label>Specialization</label>
              <input
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                placeholder="e.g., Weight Loss"
              />
            </>
          ) : null}

          <div style={{ marginTop: 12 }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;