import "./sinup.css";
import React, {useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();
  const navigate = useNavigate()
  const handleSubmission = async(e) => {
    e.preventDefault()
    const signupData = {
      name,
      email,
      phoneNumber,
      password,
    };
    const res = await fetch('http://localhost:3001/signup',{
      method:"POST",
      body:JSON.stringify(signupData),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(async(response)=>{
      const parsedResponse = await response.json()
      console.log(parsedResponse)
      if(parsedResponse.signInStatus){
        console.log("fetch returned")
        navigate('/login')
      }
    }).catch((response)=>{
      console.log(response)
    })
  };
  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSubmission}>
        <h1>Signup</h1>
        <input
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="number"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={cPassword}
          onChange={(e) => {
            setCPassword(e.target.value);
          }}
          required
        />
        <button type="submit">Sign up</button>
        <p>already have account..? <button onClick={()=>{
          navigate('/login')
        }}>Login</button></p>
      </form>
    </div>
  );
};

export default Signup;
