import React, { useState } from 'react';
import hackerthonImage from "../assest/hackerthon.png"
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate()
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'participant',
    phone: '',
    experience: 0,
    skills: ''
  });
  const [formDataLogin,setFormDataLogin]=useState({
    email:'',
    password:''
  })
  const [isLogin,setLogin]=useState(false)

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
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.setItem("user",JSON.stringify(data.user))
    } catch (err) {
        if (err.response && err.response.status === 400) {
            console.error("User already exists"); 
            
          } else {
            console.error("User Already exist"); 
          }
    }
  };
  const handleChangeLogin=(e)=>{
    const { name, value } = e.target;
    setFormDataLogin({
      ...formDataLogin,
      [name]: value
    });

  }
  const handleLoginSubmit=async (e)=>{
    e.preventDefault();
    try{
        const response= await fetch("http://localhost:5000/user/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formDataLogin)
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          
          navigate(`/home/${data.user.role}/${data.user.email}`);
          console.log(data.user); 
          localStorage.setItem("user",JSON.stringify(data.user))
        } catch (err) {
            console.log(err)
        }
  }
  return (
    <div className='flex justify-center items-center mt-5 gap-6 '>
      <div className='w-72'>
      {
        !isLogin ?
        <form className=' border-2 border-solid rounded-lg shadow-lg border-green-300 p-4' onSubmit={handleSubmit}>
        <div >
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
            <label htmlFor="email">Email</label><br/>
            <input
            className='w-full border-2 border-solid border-black p-2'
              type="email"
              name="email"
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label><br/>
            <input
            className='w-full border-2 border-solid border-black p-2'
              type="password"
              name="password"
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="role">Role</label><br/>
            <select
            className='w-full border-2 border-solid border-black p-2'
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>
          <div>
            <label htmlFor="mobile">Mobile No.</label><br/>
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
            <label htmlFor="experience">Experience</label><br/>
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
            <label htmlFor="skills">Skills</label><br/>
            <input
            className='w-full border-2 border-solid border-black p-2'
              type="text"
              name="skills"
              placeholder='Enter your skill set'
              value={formData.skills}
              onChange={handleChange}
            />
          </div>
          <button className='bg-green-400 text-white p-2 rounded-lg w-full mt-4' type='submit'>Sign Up</button>
        </div>
      </form>:
      <form className=' border-2 border-solid rounded-lg shadow-lg border-green-300 p-4' onSubmit={handleLoginSubmit}>
      <div >
        <div>
          <label htmlFor="email">Email</label><br/>
          <input
          className='w-full border-2 border-solid border-black p-2'
            type="email"
            name="email"
            placeholder='Enter your email'
            value={formDataLogin.email}
            onChange={handleChangeLogin}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label><br/>
          <input
          className='w-full border-2 border-solid border-black p-2'
            type="password"
            name="password"
            placeholder='Enter your password'
            value={formDataLogin.password}
            onChange={handleChangeLogin}
          />
        </div>
        <button className='bg-green-400 text-white p-2 rounded-lg w-full mt-4' type='submit'>Sign Up</button>
      </div>
    </form>
      }
      </div>
      <div>
        <div className='flex justify-center font-bold text-green-400 underline text-3xl mb-4'><h1>{isLogin?"Login Form":"Sign Up Form"}</h1></div>
        <img className='rounded-lg' src={hackerthonImage} alt='' />
        <div className='flex gap-2'><h1>{isLogin?'if you have not account':'if you have already account'}</h1><p className='text-green-400 underline font-bold cursor-pointer' onClick={()=>setLogin(!isLogin)}>{isLogin?'signup':'login'}</p></div>
      </div>
    </div>
  );
};

export default SignUpPage;
