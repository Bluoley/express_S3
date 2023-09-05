const prospectSchema = require("../model/prospectSchema");
const { loadDocument } = require("../service/documents");

// Get all prospects
const getAllProspects = async (req, res) => {
  try {
    const prospects = await prospectSchema.find();

    if (prospects.length === 0)
      return res.status(404).json({
        message: "No se han encontrado prospectos.",
      });

    return res.status(200).json({
      prospects,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

// Get prospect by id
const getProspectById = async (req, res) => {
  const { id } = req.params;
  try {
    const prospect = await prospectSchema.findById(id);
    if (!prospect) {
      return res.status(404).json({
        message: "No se ha encontrado el prospecto.",
      });
    }

    return res.status(200).json({
      prospect,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

// Create prospect
const createProspect = async (req, res) => {
  try {
    const prospect = await prospectSchema.create({
      ...req.body,
      documents: req.files.map((file) => file.originalname),
    });
    loadDocument(prospect._id, req.files);
    return res.status(201).json({
      prospect,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

// Update prospect
const updateProspect = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const prospect = await prospectSchema.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!prospect) {
      return res.status(404).json({
        message: "No se ha encontrado el prospecto.",
      });
    }

    return res.status(200).json({
      prospect,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

// Delete prospect
const deleteProspect = async (req, res) => {
  const { id } = req.params;
  try {
    const prospect = await prospectSchema.findByIdAndDelete(id);

    if (!prospect) {
      return res.status(404).json({
        message: "No se ha encontrado el prospecto.",
      });
    }

    return res.status(200).json({
      prospect,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAllProspects,
  getProspectById,
  createProspect,
  updateProspect,
  deleteProspect,
};
