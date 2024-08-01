import React, { useState } from 'react';

const RolesTable = ({ userRole }) => {
  const [roleId, setRoleId] = useState('');
  const [roleName, setRoleName] = useState('');
  const [hierarchy, setHierarchy] = useState(0);
  const [permissions, setPermissions] = useState({
    add: false,
    edit: false,
    remove: false
  });

  const isEditable = userRole === 'admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleCheckboxChange = (permission) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="role-management-form">
      <div>
        <label>Role ID:</label>
        <input
          type="text"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          placeholder="Role ID"
          disabled={!isEditable}
        />
      </div>
      <div>
        <label>Role Name:</label>
        <select
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          required
          disabled={!isEditable}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
          <option value="manager">Manager</option>
        </select>
      </div>
      <div>
        <label>Hierarchy:</label>
        <input
          type="number"
          value={hierarchy}
          onChange={(e) => setHierarchy(Number(e.target.value))}
          placeholder="Hierarchy Level"
          min="0"
          required
          disabled={!isEditable}
        />
      </div>
      <div>
        <label>User Management Permissions:</label>
        <div>
          <input
            type="checkbox"
            checked={permissions.add}
            onChange={() => handleCheckboxChange('add')}
            disabled={!isEditable}
          />
          <label>Add</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={permissions.edit}
            onChange={() => handleCheckboxChange('edit')}
            disabled={!isEditable}
          />
          <label>Edit</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={permissions.remove}
            onChange={() => handleCheckboxChange('remove')}
            disabled={!isEditable}
          />
          <label>Remove</label>
        </div>
      </div>
      
    </form>
  );
};

export default RolesTable;
