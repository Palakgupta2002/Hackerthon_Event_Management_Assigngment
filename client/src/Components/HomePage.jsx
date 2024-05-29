import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import CreateForm from './CreateForm';
import { Button, Modal } from "flowbite-react";
import RegistrationForm from './RegistrationForm';

const HomePage = () => {
  const { role, email } = useParams();
  const [hackerthonData, setHackerthonData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventStatus, setEventStatus] = useState("");

  const fetchHackerthonData = async () => {
    try {
      let response;
      if (role === 'organizer') {
        response = await fetch(`http://localhost:5000/hackerthon/getEmailHackerThon/${email}`);
      } else {
        response = await fetch("http://localhost:5000/hackerthon/getAllHackerthons");
      }

      if (response.ok) {
        const data = await response.json();
        setHackerthonData(data.hackerthons);
      } else {
        console.log("There is some issue with the request");
      }
    } catch (error) {
      console.log("There is some issue", error);
    }
  };

  useEffect(() => {
    fetchHackerthonData();
  }, [role, email]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setEventStatus(e.target.value);
  };

  const filteredHackerthonData = hackerthonData.filter(ele => {
    return (
      (ele.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (eventStatus ? ele.status === eventStatus : true)
    );
  });

  return (
    <div>
      <Navbar />
      <div className="mt-4">
        <div className="flex justify-center px-4 gap-6">
          <div className="flex items-center gap-5">
            <input
              className="w-72 border-2 border-solid border-black p-2 rounded-lg"
              type="text"
              placeholder="Search events by name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <select
              className="border-2 border-solid border-black p-2 rounded-lg"
              name="eventStatus"
              value={eventStatus}
              onChange={handleStatusFilter}
            >
              <option value="">All</option>
              <option value="in-progress">Ongoing</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Past</option>
            </select>
          </div>
          {role === 'organizer' && <CreateForm />}
        </div>
        <div className="mt-4 flex flex-wrap">
          {Array.isArray(filteredHackerthonData) && filteredHackerthonData.map(ele => (
            <div key={ele._id} className="bg-green-200 w-96 mx-4 rounded-md p-4 mb-4">
              <h2 className="text-xl font-semibold">{ele.name}</h2>
              <p className="text-gray-600">{ele.description}</p>
              <div className="mt-2">
                <span className="text-gray-700">{new Date(ele.date).toLocaleDateString()}</span>
                <span className="ml-2 text-gray-700">{ele.status}</span>
                {
                  role === 'organizer' ? "" : (
                    <>
                      <button
                        onClick={() => setOpenModal(true)}
                        className={`cursor-pointer text-white rounded-lg px-3 py-2 ml-3 ${ele.status === 'completed' ? 'bg-gray-400' : 'bg-green-400'}`}
                        disabled={ele.status === 'completed'}
                      >
                        {ele.status === 'completed' ? "No Opening 🚫" : "Register"}
                      </button>
                      <Modal show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Body>
                          <RegistrationForm setOpenModal={setOpenModal} hackerthonId={ele?._id} />
                        </Modal.Body>
                      </Modal>
                    </>
                  )
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
