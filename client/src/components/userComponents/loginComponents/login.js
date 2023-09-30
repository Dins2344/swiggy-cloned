import "./sinup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";


const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmission = (e)=>{
        e.preventDefault()
        const loginData = {
            email,password
        }
        fetch('http://localhost:3001/login',{
            method:"POSt",
            body:JSON.stringify(loginData),
            headers:{
                "Content-Type":'application/json'
            }
        }).then(async(response)=>{
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            if(parsedResponse.error){
              setError(parsedResponse.error)
            }
            if(parsedResponse.loginStatus){
              localStorage.setItem('accessToken',parsedResponse?.accessToken)
              dispatch(setUser(parsedResponse?.user))
                navigate('/')
            }
        })
  }
  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSubmission}>
        <h5>{error}</h5>
        <h1>Login</h1>
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <button type="submit">Login</button>
        <p>don't have account..? <button onClick={()=>{
          navigate('/signup')
        }}>signup</button></p>
      </form>
    </div>
  );
};

export default Login;
