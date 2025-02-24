import axios from "axios";

//Hard coded for prod test only
const API_URL = "http://35.226.41.172/api/customers";

//For local test
//const API_URL = "http://127.0.0.1:8000/api/customers";

const CustomerController = {
  fetchCustomers: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      return [];
    }
  },

  createCustomer: async (customerData) => {
    try {
      await axios.post(API_URL, customerData);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  }
};

export default CustomerController;
