import React, { useState, useEffect } from "react";
import NameService from "../../services/NameService";
import NameForm from "../form/NameForm";
import "./NameList.css";

const NameList = () => {
  const [nameList, setNameList] = useState([]);
  const [editingNameId, setEditingNameId] = useState(null);
  const [editFormData, setEditFormData] = useState({ first_name: "", last_name: "" });

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const data = await NameService.getNames();
      if (Array.isArray(data)) {
        setNameList(data);
      } else {
        console.error("Unexpected API response:", data);
        setNameList([]);
      }
    } catch (error) {
      console.error("Error fetching names:", error);
      setNameList([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this name?")) {
      const success = await NameService.deleteName(id);
      if (success) fetchNames();
    }
  };

  const startEditing = (name) => {
    setEditingNameId(name.id);
    setEditFormData({ first_name: name.first_name, last_name: name.last_name });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const saveUpdatedName = async () => {
    await NameService.updateName(editingNameId, editFormData);
    setEditingNameId(null);
    fetchNames();
  };

  return (
    <div className="name-list-container">
      <NameForm refreshName={fetchNames} />
      <h2>List of Names</h2>
      <table className="name-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {nameList.length > 0 ? (
            nameList.map((name) => (
              <tr key={name.id}>
                <td>{name.id}</td>
                <td>
                  {editingNameId === name.id ? (
                    <input
                      type="text"
                      name="first_name"
                      value={editFormData.first_name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    name.first_name
                  )}
                </td>
                <td>
                  {editingNameId === name.id ? (
                    <input
                      type="text"
                      name="last_name"
                      value={editFormData.last_name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    name.last_name
                  )}
                </td>
                <td className="action-buttons">
                  {editingNameId === name.id ? (
                    <>
                      <button className="save-btn" onClick={saveUpdatedName}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditingNameId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn" onClick={() => startEditing(name)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(name.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No names found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NameList;
