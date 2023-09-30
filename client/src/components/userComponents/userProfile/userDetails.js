import { useEffect, useState } from "react";
import "./userProfile.css";
import userPic from "../../../images/download.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


const UserDetailsEdit = ({userData,onSubmit}) => {
  const [name, setName] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber);
  const handleSubmission = async (e) => {
    e.preventDefault();
    const data = {
      userID:userData._id,
      name,
      email,
      phoneNumber,
    };
    await onSubmit(data)
  };

  return (
    <form className="profileDiv" onSubmit={handleSubmission}>
      <div className="userDetails">
        <div className="imageEdit">
          <img src={userPic} alt="" />
          <br></br>
          <input className="w-75" type="file" />
        </div>
        <div className="dataEntry">
          <ul>
            <li className="">
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label>Name</label>
            </li>
            <li>
              <input
                type="text"
                placeholder="Enter email ID"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label>Email</label>
            </li>
            <li>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <label>Phone Number</label>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex align-items-center ">
        <button>Submit</button>
      </div>
    </form>
  );
};

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [displayEdit, setDisplayEdit] = useState(false);
  const userID = "646a16491f2bf03dce46a9beb"
  useEffect( () => {
    const func = async () =>{
      const data = await fetchData();
      setUserData(data)
    }
    func()
  },[]);
  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const url = 'http://localhost:3001/user-info';
      const res = await fetch(url,{
        headers:{authorization:accessToken}
      });
      if (res.ok) {
        const jsonData = await res.json();
        return jsonData
      } else {
        
        throw new Error("request failed");
      }
    } catch (error) {
      console.log("user data fetching failed", error);
    }
  };

  const handleSubmitEdit = async (data)=>{
    try{
      const res = await fetch("http://localhost:3001/user-info", {
        
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(res.ok){
        setUserData(data)
        setDisplayEdit(false)
      }else{
        throw new Error('Post request failed')
      }
    }catch (error){
      console.log('user update failed',error)
    }
  }
  return (
    <div className="userProfile">
      <div className="profileDiv">
        <div className="userDetails">
          <div className="me-3">
            <img src={userPic} alt="" />
          </div>
          <div>
            <h1>{userData?.name}</h1>
            <ul>
              <li>
                <strong>Email:</strong> {userData?.email}
              </li>
              <li>
                <strong>Phone:</strong> {userData?.phoneNumber}
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex align-items-center ">
          <button onClick={() => setDisplayEdit(true)} className="btn">
            Edit Profile
          </button>
        </div>
      </div>

      {displayEdit && <UserDetailsEdit userData ={userData} onSubmit = {handleSubmitEdit} />}
    </div>
  );
};

export default UserProfile;
