const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const config = require("../config/aws");

const s3 = new S3Client({
  region: config.region,
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
});

const loadDocument = async (idProspect, files) => {
  try {
    files.forEach(async (file) => {
      const putObjectCommand = new PutObjectCommand({
        Bucket: config.bucket,
        Key: `${idProspect}/${file.originalname}`,
        Body: file.buffer,
      });
      const data = await s3.send(putObjectCommand);
    });
  } catch (error) {
    return res.status(500).json({
      error: "No se pudieron cargar los documentos.",
    });
  } finally {
    return true;
  }
};

module.exports = {
  loadDocument,
};
