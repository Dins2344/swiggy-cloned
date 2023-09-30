import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import { UserStatusContext } from "../../constants/context";
import { useContext } from "react";

const AdminLanding = () => {
  const [blockedUsers,setBlockedUsers] = useState()
  const context = useContext(UserStatusContext)
  const {updated,setUpdated} = context
  console.log(updated)
  useEffect(() => {
    const func = async () => {
     await fetchData()
    };
    func()
  },[updated]);
  const fetchData = async()=>{
    const data = await fetch("http://localhost:3001/admin/blockedData");
    if (data.ok) {
      const jsonData = await data.json();
      console.log(jsonData)
      setBlockedUsers(jsonData)
    }
  }
  return (
    <>
      <div className=" pe-5 ps-5 ">
        <div className="row w-100 mt-5">
          <div className="col-12 mb-5">
            <h3>Blocked Users</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {blockedUsers?.map((item)=>{
                  return(
                    <tr>
                    <th scope="row">1</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                  </tr>
                  )
                })}
              
              
              </tbody>
            </table>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default AdminLanding;
