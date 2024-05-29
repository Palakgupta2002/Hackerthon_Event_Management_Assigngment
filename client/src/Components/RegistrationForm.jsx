import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const RegistrationForm = ({ setOpenModal, hackerthonId }) => {
    const { email } = useParams();

    const [formData, setFormData] = useState({
        participantEmail: email || '',
        name: '',
        phone: '',
        experience: '',
        skills: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/registration/${hackerthonId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registration successful:", data);
                setOpenModal(false);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            setErrorMessage("An unexpected error occurred.");
        }
    };

    return (
        <div>
            <form className='border-2 border-solid rounded-lg shadow-lg border-green-300 p-4' onSubmit={handleSubmit}>
                <div className='flex justify-center font-bold text-xl'><h1>Registration Form</h1></div>
                {errorMessage && (
                    <div className='bg-red-200 text-red-800 p-2 mb-4 rounded'>
                        {errorMessage}
                    </div>
                )}
                <div>
                    <label htmlFor="name">Name</label><br />
                    <input
                        className='w-full border-2 border-solid border-black p-2'
                        type="text"
                        name="name"
                        placeholder='Enter your name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Mobile No.</label><br />
                    <input
                        className='w-full border-2 border-solid border-black p-2'
                        type="tel"
                        name="phone"
                        placeholder='Enter your mobile number'
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="experience">Experience</label><br />
                    <input
                        className='w-full border-2 border-solid border-black p-2'
                        type="number"
                        name="experience"
                        min={0}
                        placeholder='Enter your experience in years'
                        value={formData.experience}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="skills">Skills</label><br />
                    <input
                        className='w-full border-2 border-solid border-black p-2'
                        type="text"
                        name="skills"
                        placeholder='Enter your skill set'
                        value={formData.skills}
                        onChange={handleChange}
                    />
                </div>
                <button className='bg-green-400 text-white p-2 rounded-lg w-full mt-4' type='submit'>Register</button>
                <button type="button" onClick={() => setOpenModal(false)} className='bg-green-400 text-white p-2 rounded-lg w-full mt-4'>Close</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
