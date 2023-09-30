import React ,{ useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ()=>{
    const [userName,setUserName] = useState('')
    const [password,setPassword]= useState('')
    const [loginError,setLoginError] = useState('')
    const navigate = useNavigate()

    const handleSubmission = (e)=>{
        e.preventDefault()
        const loginData = {userName,password}
         fetch('http://localhost:3001/admin/login',{
            method:"POST",
            body:JSON.stringify(loginData),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(async(response)=>{
            const parsedResponse = await response.json()
            if(parsedResponse.loginStatus){
                navigate('/admin')
            }else{
                setLoginError(parsedResponse.error)
            }
        })
    }
    return(
        <div className="container">
        <form className="signup-form" onSubmit={handleSubmission}>
          <h1>Login</h1>
          {loginError && <p>{loginError}</p>}
          <input
            type="text"
            placeholder="User name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
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
          
        </form>
      </div>
    )
}

export default AdminLogin