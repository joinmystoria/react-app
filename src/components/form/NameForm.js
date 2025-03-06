import React, { useState } from "react";
import NameService from "../../services/NameService";
import "./NameForm.css";

const NameForm = ({ refreshName }) => {
  const [formData, setFormData] = useState({ first_name: "", last_name: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await NameService.addName(formData);
    setFormData({ first_name: "", last_name: "" }); // Reset form
    await refreshName(); // Refresh name list

    setLoading(false);
  };

  return (
    <div className="name-form-container">
      <h2>Add Name</h2>
      <form onSubmit={handleSubmit} className="name-form">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Name"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NameForm;
