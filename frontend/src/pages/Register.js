import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/users/register", {
        username,
        email,
        password,
      });

      navigate("/dashboard");
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>

      <p onClick={() => navigate("/")}>Back to Login</p>
    </div>
  );
}

export default Register;