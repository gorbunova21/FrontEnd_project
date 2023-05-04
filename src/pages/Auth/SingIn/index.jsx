import React, { useState, useEffect } from "react"
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import { setToken } from "../../../actions/mealsActions"
import { useMealContext } from "../../../context/mealContext"

const SingIn = () => {
  const navigate = useNavigate()
  const { dispatch } = useMealContext()
  console.log(dispatch)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})

  const handleInput = (event) => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value

    setForm(oldForm => ({
      ...oldForm,
      [target.name]: value,
    }))
  }

  const validate = (values) => {
    let errors = {}

    if (!values.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid"
    }

    if (!values.password) {
      errors.password = "Password is required"
    } else if (values.password.length < 6) {
      errors.password = "Password must be longer than 6 characters"
    }

    setErrors(errors)
  }

  useEffect(() => {
    validate(form)
  }, [form])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(errors).length === 0) {
      axios.get('https://63090aeb722029d9ddddad9e.mockapi.io/users')
        .then(response => {
          if (response.data.some(user => user.email === form.email && user.password === form.password)) {
            const id = response.data.find(user => user.email === form.email && user.password === form.password).id
            localStorage.setItem("token", JSON.stringify(id))
            setToken(dispatch, id)
            navigate("/")
          } else {
            alert("User not found")
          }
        })
        .catch(error => {
          alert("Error creating user")
        })
    }
  }

  return (
    <div className="mx-auto pt-10 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onClick={handleSubmit}>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 ">Your email</label>
            <input onChange={handleInput} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 ">Password</label>
            <input onChange={handleInput} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center ">Sign in</button>
          <p className="text-xl font-light text-gray-500 ">
            Don’t have an account yet? <Link to="/singup" className="font-medium text-primary-600 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SingIn
