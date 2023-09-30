import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useContext } from "react";
import { UserStatusContext } from "../../constants/context";

const Users = () => {
  const [users, setUsers] = useState();
  const [filteredUser, setFilteredUser] = useState();
  const [searchText, setSearchText] = useState();
  const context = useContext(UserStatusContext)
  const {updated,setUpdated} = context
  useEffect( () => {
    const func = async()=>{
      const fetchedUsers = await fetchData();
      setUsers(fetchedUsers);
      setFilteredUser(fetchedUsers);
    }
    func()
  }, []);
  const fetchData = async () => {
    const users = await fetch("http://localhost:3001/admin/users");
    if (users.ok) {
      const jsonData = await users.json();
      return jsonData.users;
    }
  };
  const statusUpdate = async (userId) => {
    const updatedUsers = users?.map((user)=>{
      if(user._id===userId){
        console.log(user)
        if(user.blocked){
          return {...user,blocked:false}
        }else{
          return{...user,blocked: true}
        }
      }
      console.log(user)
      return user
    })
    setUsers(updatedUsers)
    setFilteredUser(updatedUsers)
    await fetch(`http://localhost:3001/admin/users/update/${userId}`);
    setUpdated(true)
  };
  const deleteUser = async (userId) => {
    const res = await fetch(`http://localhost:3001/admin/users/delete/${userId}`);
    console.log(res)
    if(res.ok){
      const fetchedUsers = await fetchData();
      console.log(fetchedUsers)
      setFilteredUser(fetchedUsers)
      setUsers(fetchedUsers)
    }
  };
  const filterUsers = (text,data)=>{
  if (data && Array.isArray(data)) {
    const filtered = data.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    return filtered
  }
  }

  return (
    <>
      <div className=" pe-5 ps-5 ">
        <div className="mt-3">
          <input
            value={searchText}
            placeholder="Search a user"
            type="text"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="btn btn-secondary border border-1 p-1 btn-sm" onClick={()=>{
            const filtered = filterUsers(searchText,users)
            setFilteredUser(filtered)
          }}>
            Search
          </button>
        </div>
        <div className="row w-100 mt-5">
          <div className="col-12 mb-5">
            <h3>All Users</h3>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email ID</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUser &&
                  filteredUser.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phoneNumber}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              onClick={() => {
                                statusUpdate(item._id);
                              }}
                              className="btn"
                            >
                              {item.blocked ? "Unblock" : "Block"}
                            </button>
          
                            <button
                              onClick={() => {
                                deleteUser(item._id);
                              }}
                              className="btn"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
