
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("")

    try {
      const response = await fetch(
        "https://refactored-couscous-wq5gj96j77529xx9-3001.app.github.dev/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );  

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }

      setMessage(data.msg);
      console.log("Registro exitoso:", data);
    } catch (error) {
      setMessage(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <h1> Login </h1>
    
    <form onSubmit={handleSubmit} className="mb-3 text-center">
      <label htmlFor="email" className="form-label">
        Email address
      </label>
      <input
        type="email"
        value={email}
        className="form-control"
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        placeholder="name@example.com"
        required
      />

      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        id="password"
        placeholder="Enter your password"
        required
      />

      <button type="submit" className="btn btn-primary mt-3">
        Login
      </button>

      {message && <p className="mt-2">{message}</p>}
    </form>
    <p> Ya tienes una cuenta? <Link to="/signup"> registrate</Link> </p>
    </>
  );
};
