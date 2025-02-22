import CustomerController from "../controllers/CustomerController";

const CustomerService = {
  getCustomers: async () => {
    return await CustomerController.fetchCustomers();
  },

  addCustomer: async (customerData) => {
    return await CustomerController.createCustomer(customerData);
  }
};

export default CustomerService;
