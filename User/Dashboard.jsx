import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from 'react-icons/fa';
import RolesTable from './RolesTable';
import './Dashboard.css'; // Ensure you import the CSS file
import Usermanage from "./Usermanage";

export default function Dashboard() {
  const [getuser, setgetuser] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [userIdInput, setUserIdInput] = useState('');
  const [isUserIdCorrect, setIsUserIdCorrect] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDetails();
  }, []); 
 
  const getDetails = () => {
    axios.get("https://66a9dabe613eced4eba688e7.mockapi.io/users/usermanage")
      .then(res => setgetuser(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      axios.delete(`https://66a9dabe613eced4eba688e7.mockapi.io/users/usermanage/${id}`)
        .then(res => {
          console.log(res);
          getDetails();
        })
        .catch(err => alert(err));
    }
  };

  const handleEdit = (item) => {
    console.log(item);
    navigate('/Usermanage', {
      state: { ...item }
    });
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    if (role === 'admin') {
      setPasswordRequired(true);
    } else {
      setPasswordRequired(false);
      setIsUserIdCorrect(true); 
    }
  };

  const handleUserIdSubmit = (e) => {
    e.preventDefault();

    const adminUserIds = getuser
      .filter(user => user.Role === 'admin')
      .map(user => user.Userid);

    if (adminUserIds.includes(userIdInput)) {
      setIsUserIdCorrect(true);
    } else {
      alert('Incorrect User ID or Role mismatch');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {passwordRequired && !isUserIdCorrect ? (
        <div className="box">
          <form onSubmit={handleUserIdSubmit}>
            <div>
              <label>User ID:</label>
              <input
                type="text"
                value={userIdInput}
                onChange={(e) => setUserIdInput(e.target.value)}
                placeholder="Enter your User ID"
                required
              />
            </div>
            <button type="submit">Submit User ID</button>
          </form>
        </div>
      ) : (
        <div className="box">
          <div>
            <caption>User list</caption>
            <select onChange={handleRoleChange} value={selectedRole}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
              <option value="manager">Manager</option>
            </select>
            {selectedRole === 'admin' && isUserIdCorrect && (
              <RolesTable userRole={selectedRole} />
            )}
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {getuser.map((item) => (
                  <tr key={item.id}>
                    <td>{item.Userid}</td>
                    <td>{item.Name}</td>
                    <td>{item.Email}</td>
                    <td>{item.Role}</td>
                    <td>
                      <button className="delete-button" onClick={() => handleDelete(item.id)}>
                        Delete <FaTrash className="icon" />
                      </button>
                    </td>
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(item)}>
                        Edit <FaEdit className="icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

}
