const { StatusCodes } = require("http-status-codes");
const { AdminModel } = require("../../models/Admin.model");

const allAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(StatusCodes.OK).send(admins);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Something went wrong" });
  }
};

const getAdmin = async (req, res) => {
  const id = req.params.adminId;

  try {
    const admin = await AdminModel.findById(id);

    if (!admin) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "User not found" });
    }

    res.status(StatusCodes.OK).send(admin);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const updateAdmin = async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByIdAndUpdate({ _id: id }, payload);
    if (!admin) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: `Admin with id ${id} not found` });
    }
    res.status(StatusCodes.OK).send(`Admin with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Something went wrong, unable to Update." });
  }
};

const deleteAllAdmins = async (req, res) => {
  try {
    await AdminModel.deleteMany();
    res.status(StatusCodes.OK).send("All admins deleted");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const deleteAdmin = async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: id });
    if (!admin) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: `Admin with id ${id} not found` });
    }
    res.status(StatusCodes.OK).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Something went wrong, unable to Delete." });
  }
};

module.exports = {
  allAdmins,
  getAdmin,
  updateAdmin,
  deleteAllAdmins,
  deleteAdmin,
};
