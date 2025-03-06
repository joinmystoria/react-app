import NameController from "../controllers/NameController";

const NameService = {
  getNames: async () => {
    return await NameController.fetchName();
  },

  addName: async (nameData) => {
    return await NameController.createName(nameData);
  },

  updateName: async (id, updatedData) => {
    return await NameController.updateName(id, updatedData);
  },

  deleteName: async (id) => {
    return await NameController.deleteName(id);
  }
};

export default NameService;
