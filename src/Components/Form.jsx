import React, { isValidElement, useState } from 'react';
import "../App.css"

function Form() {
    const [FormData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interests: [],
        birthDate: "",
    });

    const [errors, setErrors] = useState({});
    console.log(errors.interests)

    const isValidEmail = (email) => {
        // regular expression for basic email validation 
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    }

    const isValidPhoneNumber = (phoneNumber) => {
        //Regular expression for basic phone number validation 
        const phoneRegex = /^\d{10}$/;
        return phoneNumber.test(phoneNumber);
    }

    const isValidPassword = (password) => {
        // Regular expression for password validation
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const numberRegex = /[0-9]/;
        const upperCaseRegex = /[A-Z]/;
        const lowerCaseRegex = /[a-z]/;

        return (
            password.length >= 8 &&
            symbolRegex.test(password) &&
            numberRegex.test(password) &&
            upperCaseRegex.test(password) &&
            lowerCaseRegex.test(password)
        );
    };

    const isValidAge = (age) => {
        return parseInt(age) >= 18 && parseInt(age) <= 100;
    };




    //form validation checking fun 
    const validateForm = () => {
        let newErrors = {};

        if (!FormData.firstName) {
            newErrors.firstName = "First name is required";
        }

        if (!FormData.lastName) {
            newErrors.lastName = "Last name is required";
        }

        if (!FormData.email) {
            newErrors.email = "Email is required";
        } else if (!isValidEmail(FormData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!FormData.phoneNumber) {
            newErrors.phoneNumber = "phone number is required";
        } else if (!isValidPhoneNumber(FormData.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10 digit";
        }

        if (!FormData.password) {
            newErrors.password = "Password is required";
        } else if (!isValidPassword(FormData.password)) {
            newErrors.password = "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, one lowercase latter";
        }

        if (!FormData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (FormData.confirmPassword !== FormData.password) {
            newErrors.confirmPassword = "Password must match";
        }

        if (!FormData.age) {
            newErrors.age = "Age is required";
        } else if (!isValidAge(FormData.age)) {
            newErrors.age = "You must be at least 10 years old and not older than 100 years";
        }

        if (!FormData.gender) {
            newErrors.gender = "Gender is required";
        }

        if (!FormData.interests.length == 0) {
            newErrors.interests = "Select at least one interest";
        }

        if (!FormData.birthDate) {
            newErrors.birthDate = "Date of birth is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (isValid) {
            console.log("Form submitted", FormData);
        } else {
            console.log("Form Validation Faild");
        }
    };

    const handleChangeForm = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...FormData, [name]: value,
        })
    }

    const handleCheckboxChange = () => {
        const { name, checked } = e.target;
        let updatedInterests = [...FormData.interests]
        if (checked) {
            updatedInterests.push(name);
        } else {
            updatedInterests = updatedInterests.filter((interest) => interest !== name);
        }

        setFormData({
            ...FormData,
            interests: updatedInterests,
        });

    }

    return (
        <div className="main">
            <form className='form' onSubmit={handleSubmit}>
                <h1>Form Validation</h1>

                <div>
                    <label>First Name: </label>
                    <input
                        type="text"
                        name="firstName"
                        value={FormData.firstName}
                        placeholder="Enter Your First Name"
                        className="firstName"
                        onChange={handleChangeForm}
                    />

                    {
                        errors.firstName &&
                            <div className='error'>{errors.firstName}</div>
                    }
                </div>

                <div>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        name="lastName"
                        value={FormData.lastName}
                        placeholder="Enter Your last Name"
                        className="lastName"
                        onChange={handleChangeForm}
                    />
                    {
                        errors.lastName &&
                        <div className='error'>{errors.lastName}</div>
                    }
                </div>

                <div>
                    <label>Email: </label>
                    <input
                        type="text"
                        name="email"
                        value={FormData.email}
                        placeholder="Enter Your Email"
                        onChange={handleChangeForm}
                    />
                    {
                        errors.email &&
                        <div className='error'>{errors.email}</div>
                    }
                </div>

                <div>
                    <label>Phone Number: </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={FormData.phoneNumber}
                        placeholder="Enter Your phone number"
                        onChange={handleChangeForm}
                    />
                    {
                        errors.phoneNumber &&
                        <div className='error'>{errors.phoneNumber}</div>
                    }
                </div>

                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={FormData.password}
                        placeholder="Enter Your password"
                        onChange={handleChangeForm}
                    />
                    {
                        errors.password &&
                        <div className='error'>{errors.password}</div>
                    }
                </div>

                <div>
                    <label>Confirm Password: </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={FormData.confirmPassword}
                        placeholder="confirm your password"
                        onChange={handleChangeForm}
                    />
                    
                    {
                        errors.confirmPassword &&
                        <div className='error'>{errors.confirmPassword}</div>
                    }

                </div>

                <div>
                    <label>Age: </label>
                    <input
                        type="number"
                        name="age"
                        value={FormData.age}
                        placeholder="Enter your age"
                        onChange={handleChangeForm}
                    />
                    {
                        errors.age &&
                        <div className='error'>{errors.age}</div>
                    }
                </div>

                <div>
                    <label>Gender</label>
                    <select name="gender" value={FormData.gender} onChange={handleChangeForm}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {
                        errors.gender &&
                        <div className='error'>{errors.gender}</div>
                    }
                </div>


                <div>
                    <label>Interests:</label>
                    <label>
                        <input
                            type="checkbox"
                            name="coding"
                            checked={FormData.interests.includes("coding")}
                            onChange={handleCheckboxChange}
                        />
                        Coding
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="sports"
                            checked={FormData.interests.includes("sports")}
                            onChange={handleCheckboxChange}
                        />
                        Sports
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="reading"
                            checked={FormData.interests.includes("reading")}
                            onChange={handleCheckboxChange}
                        />
                        Reading
                    </label>
                    {
                        errors.interests &&
                        <div className='error'>{errors.interests}</div>
                    }
                </div>

                <div>
                    <label>Date Of Birth: </label>
                    <input
                        type="date"
                        name="birthDate"
                        value={FormData.birthDate}
                        placeholder="Enter your date of birth"
                        onChange={handleChangeForm}
                    />
                    {
                        errors.birthDate &&
                        <div className='error'>{errors.birthDate}</div>
                    }
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Form;