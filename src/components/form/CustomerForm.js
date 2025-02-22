import React, { useState } from "react";
import CustomerService from "../../services/CustomerService";
import "./CustomerForm.css";

const CustomerForm = ({ refreshCustomers }) => {
  const [formData, setFormData] = useState({ first_name: "", last_name: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CustomerService.addCustomer(formData);
    setFormData({ first_name: "", last_name: "" });
    refreshCustomers(); // Refresh customer list after adding
  };

  return (
    <div className="customer-form-container">
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit} className="customer-form">
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
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default CustomerForm;
