import logo from "../../images/swiggyLogo.png";
import "./app.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isToken,setIsToken] = useState()
  const user = useSelector((state)=>state.userSlice.user)
  const navigate = useNavigate()
  const token = localStorage.getItem('accessToken')

  useEffect(()=>{
    tokenCheck()
  })
  const tokenCheck = ()=>{
    token?setIsToken(true):setIsToken(false)
  }
  const logOut = ()=>{
    console.log('called')
    localStorage.removeItem('accessToken')
    setIsToken(false)
  }
  const logIn = ()=>{
    navigate('/login')
  }
  return (
    <div className="headerDiv">
      <Link to={"/"}>
        <img className="logo" src={logo} alt=""></img>
      </Link>
      <ul className="navItems">
        <li>
          {" "}
          <Link to={"/about"}>About</Link>
        </li>
        <li>
          {" "}
          <Link to={'/user-info'}>User</Link>
        </li>
        <li>
          {" "}
          <Link to={"/contact"}>Contact Us</Link>
        </li>
        <li>
          {" "}
          <Link to={'/my-cart'}>Cart</Link>
        </li>
        <li>
          {isToken ? (
            <button onClick={logOut}>Logout</button>
          ) : (
            <button onClick={logIn}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
