const allAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
};

const getAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await AdminModel.findById(id);

    if (!admin) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(admin);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Server Error");
  }
};

const updateAdmin = async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByIdAndUpdate({ _id: id }, payload);
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
};

const deleteAllAdmins = async (req, res) => {
  try {
    await AdminModel.deleteMany();
    res.status(200).send("All admins deleted");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Server Error");
  }
};

const deleteAdmin = async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: id });
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
};

module.exports = {
  allAdmins,
  getAdmin,
  updateAdmin,
  deleteAllAdmins,
  deleteAdmin
}