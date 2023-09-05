const mongoose = require("mongoose");
const { Schema } = mongoose;

const prospectSchema = new Schema({
  nameProspect: { type: String, required: true },
  firstLastNameProspect: { type: String, required: true },
  lastNameProspect: String,
  addressProspect: {
    street: { type: String, required: true },
    number: { type: Number, required: true },
    zipCode: { type: Number, required: true },
    district: { type: String, required: true },
  },
  phoneProspect: { type: String, required: true },
  RFCProspect: { type: String, required: true },
  documents: { type: [String], required: true },
});

module.exports = mongoose.model("Prospect", prospectSchema);
