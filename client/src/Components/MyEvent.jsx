import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MyEvent = () => {
    const { email } = useParams();
    const [data, setData] = useState([]);

    const handleEventData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/registration/${email}`);
            if (response.ok) {
                const fetchData = await response.json();
                setData(fetchData.data);
            } else {
                console.log("Error fetching data");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleEventData();
    }, [email]);

    return (
        <div className="p-4 bg-green-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-8">My Registered Events</h1>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data && data.map((event) => (
                    <div key={event._id} className="bg-green-400 shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                        <p className="text-gray-700 mb-2"><strong>Organizer:</strong> {event.organizerEmail}</p>
                        <p className="text-gray-700 mb-2"><strong>Company:</strong> {event.company}</p>
                        <p className="text-gray-700 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-gray-700 mb-2"><strong>Description:</strong> {event.description}</p>
                        <p className="text-gray-700"><strong>Status:</strong> {event.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEvent;
