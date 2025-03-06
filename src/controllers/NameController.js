import axios from "axios";

// Get API base URL from .env
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const NameController = {
  // Fetch all names
  fetchName: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/names`);
      return response.data || []; // Ensure it returns an array
    } catch (error) {
      console.error("Error fetching names:", error);
      alert("Failed to fetch names. Please try again.");
      return [];
    }
  },

  // Add a new name
  createName: async (nameData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, nameData);
      return response.data; // Return created name for confirmation
    } catch (error) {
      console.error("Error adding name:", error);
      alert("Failed to add name. Please check your input.");
    }
  },

  // Update an existing name
  updateName: async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update/${id}`, updatedData);
      return response.data; // Return updated data
    } catch (error) {
      console.error("Error updating name:", error);
      alert("Failed to update name. Please try again.");
    }
  },

  // Delete a name
  deleteName: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      return true; // Indicate success
    } catch (error) {
      console.error("Error deleting name:", error);
      alert("Failed to delete name. Please try again.");
      return false;
    }
  }
};

export default NameController;
