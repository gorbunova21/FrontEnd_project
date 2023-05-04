import React, { useEffect, useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import { setToken } from "../../../actions/mealsActions"
import { useMealContext } from "../../../context/mealContext"

const SingUp = () => {
    const navigate = useNavigate()
    const { dispatch } = useMealContext()
    const [form, setForm] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        acceptCheckbox: false,
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

        if (!values.passwordConfirm) {
            errors.passwordConfirm = "Password is required"
        } else if (values.passwordConfirm !== values.password) {
            errors.passwordConfirm = "Passwords do not match"
        }

        if (!values.acceptCheckbox) {
            errors.acceptCheckbox = "You must accept the terms and conditions"
        }

        setErrors(errors)
    }

    useEffect(() => {
        validate(form)
    }, [form])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.keys(errors).length === 0) {
            axios.post('https://63090aeb722029d9ddddad9e.mockapi.io/users', form)
                .then(response => {
                    alert("User created successfully")
                    localStorage.setItem("token", response.data.id)
                    setToken(dispatch, response.data.id)
                    navigate("/")
                })
                .catch(error => {
                    alert("Error creating user")
                })
        }
    }


    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow  md:mt-0 sm:max-w-xl xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Create and account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 text-xl font-medium text-gray-900">Your email</label>
                        <input onChange={handleInput} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-xl font-medium text-gray-900">Password</label>
                        <input onChange={handleInput} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-xl font-medium text-gray-900">Confirm password</label>
                        <input onChange={handleInput} type="password" name="passwordConfirm" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                        {errors.passwordConfirm && <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>}
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input name="acceptCheckbox" onChange={handleInput} id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                        </div>
                        <div className="ml-3 text-xl ">
                            <label className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                        </div>
                        {errors.acceptCheckbox && <p className="text-red-500 text-sm">{errors.acceptCheckbox}</p>}
                    </div>
                    <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl  px-5 py-2.5 text-center">Create an account</button>
                    <p className="text-xl  font-light text-gray-500 ">
                        Already have an account? <Link to="/singin" className="font-medium text-primary-600 hover:underline">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SingUp
