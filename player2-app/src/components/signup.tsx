import React, { useState, ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// COMPONENTS
import Header from './Header'

interface SignUpProps {}

interface SignUpState {
  userName: string
  firstName: string
  email: string
  password: string
  passwordConfirm: string
  valid: string
}

const SignUp: React.FC<SignUpProps> = () => {
  const initialSignUp: SignUpState = {
    userName: "",
    firstName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    valid: "",
  }

  const navigate = useNavigate()
  const [form, setForm] = useState(initialSignUp)
  const [platforms, setPlatforms] = useState({ pc: false, nintendo: false, xbox: false, playstation: false });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.userName === "" || form.firstName === "" || form.email === "" || form.password === "" || form.passwordConfirm === "") {
      setForm({ ...form, valid: "All Fields are Required!" })
      return
    }

    if (form.password !== form.passwordConfirm) {
      setForm({ ...form, valid: "Passwords Must Match!" })
      return
    }

    try {
      const response = await axios.post("http://localhost:3001/signup", {
        userName: form.userName,
        firstName: form.firstName,
        email: form.email,
        password: form.password,
        platforms: platforms,
      })

      console.log(response)
      setForm(initialSignUp)
      setPlatforms({ pc: false, nintendo: false, xbox: false, playstation: false })
      navigate("/login")
    } catch (e) {
      console.error("Error during registration:", e.response)
      setForm({ ...form, valid: "Registration failed. Please try again." })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm({ ...form, [id]: value, valid: "" })
  }

  const handlePlatformClick = (platform: string) => {
    setPlatforms({ ...platforms, [platform]: !platforms[platform] })
  }

  return (
    <>
      <Header />
      <div className="Create-Account">
        <h2 className="title">SIGN UP</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="userName">Username:</label>
          <br />
          <input
            type="text"
            id="userName"
            placeholder="Choose Username"
            value={form.userName}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="firstName">First Name:</label>
          <br />
          <input
            type="text"
            id="firstName"
            placeholder="Enter Your First Name"
            value={form.firstName}
            onChange={handleChange}
          />
          <br />
          <div className="platform-choices">
          <label htmlFor="platform-buttons">Chosen Platforms:</label>
          <div className="platform-buttons">
            <button type="button" onClick={() => handlePlatformClick("pc")} className={platforms.pc ? "selected" : ""}>PC</button>
            <button type="button" onClick={() => handlePlatformClick("nintendo")} className={platforms.nintendo ? "selected" : ""}>Nintendo</button>
            <button type="button" onClick={() => handlePlatformClick("xbox")} className={platforms.xbox ? "selected" : ""}>X-Box</button>
            <button type="button" onClick={() => handlePlatformClick("playstation")} className={platforms.playstation ? "selected" : ""}>Playstation</button>
          </div>
        </div>
        <label htmlFor="email">Email Address:</label>
          <br />
          <input
            type="text"
            id="email"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <br />
          <input
            type="password"
            id="passwordConfirm"
            placeholder="Confirm Password"
            value={form.passwordConfirm}
            onChange={handleChange}
          />
          <br />
          <button type="submit" className="login-button">
            Sign-Up
          </button>
        </form>
      </div>
    </>
  )
}

export default SignUp