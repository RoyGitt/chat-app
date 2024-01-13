import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const { data } = await axios.post(loginRoute, {
      email,
      password,
    });

    if (data?.success === false) {
      toast.error(data.message, toastOptions);
    }

    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  console.log(formData);

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Chatpat</h1>
          </div>

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            id="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            id="password"
            required
          />

          <button type="submit">Login</button>
          <span>
            Create an account? <Link to="/register">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};
export default Login;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    max-width: 100%;
    width: 30rem;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
