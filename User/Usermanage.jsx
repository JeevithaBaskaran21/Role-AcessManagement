import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './Usermanage.css'; 

export default function Usermanage() {
  const location = useLocation();
  const navigate = useNavigate();                                          
  const [user, setuser] = useState({
    Userid: "",
    Name: "",
    Email: "",
    Role: ""                                     
  });
  const [btn, setbtn] = useState('Save');
  const [id, setid] = useState(0);
  const [visible, setvisible] = useState(false);
  
  const { Userid, Name, Email, Role } = user;

  useEffect(() => {
    if (location && location.state) {
      setuser(location.state);
      setbtn('Update');
      setid(location.state.id);
    }
  }, [location]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setuser(prevstate => ({
      ...prevstate,
      [name]: value
    }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (btn === 'Save') {
      SaveDetails();
    } else {
      updateDetails();
    }
  };

  const formvisibility = () => {
    setvisible(true);                                  
  };

  const SaveDetails = () => {
    axios.post(`https://66a9dabe613eced4eba688e7.mockapi.io/users/usermanage`, user)
      .then(res => {
        console.log(res);
        alert("Saved successfully");   
        navigate("/Dashboard");                             
      })
      .catch(err => {
        console.error(err);
        alert("Failed to save");                                
      });
  };

  const updateDetails = () => {
    axios.put(`https://66a9dabe613eced4eba688e7.mockapi.io/users/usermanage/${id}`, user)
      .then(res => {
        console.log(res); 
        alert("Updated successfully"); 
        navigate("/Dashboard");  
      })
      .catch(err => {
        console.error(err);
        alert("Failed to update");                               
      });
  };

  return (
    <div className="user-manage-container">
      <button onClick={formvisibility}>Create User</button>
      {visible && (
        <form onSubmit={handlesubmit}>
          <div>                                
            <label>User ID:</label>  
            <input
              type="text"
              placeholder="User ID"
              name="Userid"
              value={Userid}
              onChange={handlechange}
            />
          </div> 
          <div>                                
            <label>Name:</label>  
            <input
              type="text"
              placeholder="Name"
              name="Name"
              value={Name}
              onChange={handlechange}
            />
          </div> 
          <div>                                
            <label>Email:</label>  
            <input
              type="text"
              placeholder="Email address"
              name="Email"
              value={Email}
              onChange={handlechange}
            />
          </div> 
          <div>                                
            <label>Role:</label>  
            <input
              type="text"
              placeholder="Role"
              name="Role"
              value={Role}
              onChange={handlechange}
            />
          </div>  
          <button type="submit">{btn} User</button>
        </form>
      )}
    </div>    
  );
}
