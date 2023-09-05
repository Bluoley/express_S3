const express = require("express");
const router = express.Router();
const multer = require("multer");
const prospectController = require("../controller/prospectController");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // límite de tamaño de archivo de 5 MB
  },
  fileFilter(req, file, cb) {
    cb(null, true);
  },
}).array("files", 100);

router.get("/prospect/all", prospectController.getAllProspects);
router.get("/prospect/:id", prospectController.getProspectById);
router.post("/prospect", upload, prospectController.createProspect);
router.put("/prospect/:id", prospectController.updateProspect);
router.delete("/prospect/:id", prospectController.deleteProspect);

module.exports = router;
