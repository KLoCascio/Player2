// HEADER
// username, name, age, email, platforms, favorite games
import React, { useState, ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// COMPONENTS
import Header from './Header'
import Footer from './Footer'

interface SignUpProps {}

interface SignUpState {
  userName: string
  password: string
  passwordConfirm: string
  valid: string
}

const SignUp: React.FC<SignUpProps> = () => {
  const initialSignUp: SignUpState = {
    userName: "",
    password: "",
    passwordConfirm: "",
    valid: "",
  }

  const navigate = useNavigate()
  const [form, setForm] = useState(initialSignUp)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.userName === "" || form.password === "" || form.passwordConfirm === "") {
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
        password: form.password,
      })

      console.log(response)
      setForm(initialSignUp)
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

  return (
    <>
      <Header />
      <div className="Create-Account">
        <h2 className="title"> Create Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="userName">username:</label>
          <br />
          <input
            type="text"
            id="userName"
            placeholder="Enter username..."
            value={form.userName}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            placeholder="Enter password..."
            value={form.password}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <br />
          <input
            type="password"
            id="passwordConfirm"
            placeholder="Confirm password..."
            value={form.passwordConfirm}
            onChange={handleChange}
          />
          <br />
          <button type="submit" className="login-button">
            Create Account
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default SignUp
