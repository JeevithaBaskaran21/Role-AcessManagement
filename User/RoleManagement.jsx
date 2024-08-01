import React from 'react';
import RolesTable from './RolesTable';
import axios from 'axios';

const RoleManagement = ({ userRole }) => {
  const handleRoleSubmit = async (roleData) => {
    try {
      await axios.post('https://66a9dabe613eced4eba688e7.mockapi.io/users/usermanage', roleData);
      alert('Role saved successfully');
    } catch (error) {
      console.error('Error saving role:', error);
      alert('Failed to save role');
    }
  };

  return (
    <div>
      <h2>Role Management</h2>
      <RolesTable onSubmit={handleRoleSubmit} userRole={userRole} />
    </div>
  );
};

export default RoleManagement;
