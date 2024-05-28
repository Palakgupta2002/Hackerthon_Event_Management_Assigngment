import React, { useState } from 'react';
import { Button, Modal } from "flowbite-react";
import { useParams } from 'react-router-dom';

const CreateForm = () => {
    const { email } = useParams();
    const [openModal, setOpenModal] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: email,
        company: '',
        date: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response= await fetch("http://localhost:5000/hackerthon/createHackerthon",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        if(response.ok){
            console.log("i got the data")
        }
        console.log('data is not go in bakend')
        } catch(error){
            console.log(error)
        }

        setOpenModal(false);
    };

    return (
        <>
            <Button className='text-black border-2 border-solid border-black' onClick={() => setOpenModal(true)}>Create Hackathon Event</Button>
            <Modal className='bg-white border-2 border-solid border-green-200 translate-3 w-fit px-8' dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Body className='text-black flex justify-center w-full h-full'>
                    <div>
                        <div className='font-bold text-2xl underline text-black'>Create Hackathon Event</div>
                        <form className='w-full bg-green-500 border-2 border-solid rounded-lg shadow-lg border-green-300 p-4' onSubmit={handleSubmit}>
                            <div>
                                <div>
                                    <label htmlFor="name">Name</label><br/>
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
                                    <label htmlFor="company">Company name</label><br/>
                                    <input
                                        className='w-full border-2 border-solid border-black p-2'
                                        type="text"
                                        name="company"
                                        placeholder='Enter company name'
                                        value={formData.company}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date">Date</label><br/>
                                    <input
                                        className='w-full border-2 border-solid border-black p-2'
                                        type="date"
                                        name="date"
                                        placeholder='Enter hackathon event date'
                                        value={formData.date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label><br/>
                                    <input
                                        className='w-full border-2 border-solid border-black p-2'
                                        type="text"
                                        name="description"
                                        placeholder='Enter description'
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className='bg-green-400 text-white p-2 rounded-lg w-full mt-4' type='submit'>Create Event</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateForm;
