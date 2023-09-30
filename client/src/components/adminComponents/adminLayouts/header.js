import './header.css'
import logo from "../../../images/swiggyLogo.png"
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <>
      <nav class="admin-nav">
        <div>
            <img src={logo}></img>
        </div>
        <ul>
          <li>
            <Link to={'/admin'} >
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={'/admin/users'}>Users</Link>
          </li>
          <li>
            <Link to={'/admin/'}>Products</Link>
          </li>
          <li>
            <Link to={'/admin/'}>Orders</Link>
          </li>
          <li>
            <Link to={'/admin/'}>Settings</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};


export default AdminHeader