import React, { useState, useEffect } from "react";
import CustomerService from "../../services/CustomerService";
import CustomerForm from "../form/CustomerForm";
import "./CustomerList.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const data = await CustomerService.getCustomers();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="customer-container">
      <CustomerForm refreshCustomers={fetchCustomers} />
      <h2>Customer List</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
