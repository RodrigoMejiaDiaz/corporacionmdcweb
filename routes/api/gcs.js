const { Storage } = require("@google-cloud/storage");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const os = require("os");
const multer = require("multer");

const storageM = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage: storageM, fileFilter });

const gTokenPath = path.join(`${__dirname}/gToken.json`);
fs.writeFileSync(gTokenPath, process.env.GCS_KEYFILE);
const keyfile = JSON.parse(process.env.GCS_KEYFILE);
const storage = new Storage({
  projectId: keyfile.project_id,
  keyFilename: gTokenPath,
});

//Subir IMG
const subirImagen = async (archivo) => {
  try {
    const nombreArchivo = uuidv4() + path.extname(archivo.originalname);
    const archivoStream = archivo.path;
    const opcionesUpload = {
      destination: nombreArchivo,
      resumable: false,
      metadata: {
        contentType: archivo.mimetype,
      },
    };
    const bucket = storage.bucket("corporacionmdc-imgs");
    await bucket.upload(archivoStream, opcionesUpload);
    const url = `https://storage.googleapis.com/${bucket.name}/${nombreArchivo}`;
    console.log("Se subió la imagen al url:" + url);
    return url;
  } catch (error) {
    console.log(error);
    throw new Error("Error al subir la imagen al bucket");
  }
};

// Elimina la imagen del bucket
async function deleteImageFromBucket(filename) {
  const bucket = storage.bucket("corporacionmdc-imgs");
  await bucket.file(filename).delete();

  console.log(`Imagen ${filename} eliminada del bucket`);
}

//Subir PDF
const subirPdf = async (archivo) => {
  try {
    const nombreArchivo = uuidv4() + path.extname(archivo.originalname);
    const archivoStream = archivo.path;
    const opcionesUpload = {
      destination: nombreArchivo,
      resumable: false,
      metadata: {
        contentType: archivo.mimetype,
      },
    };
    const bucket = storage.bucket("corporacionmdc-imgs");
    await bucket.upload(archivoStream, opcionesUpload);
    const url = `https://storage.googleapis.com/${bucket.name}/${nombreArchivo}`;
    console.log("Se subió PDF al url:" + url);
    return url;
  } catch (error) {
    console.log(error);
    throw new Error("Error al subir PDF al bucket");
  }
};

// Elimina la pdf del bucket
async function deletePdfFromBucket(filename) {
  const bucket = storage.bucket("corporacionmdc-imgs");
  await bucket.file(filename).delete();

  console.log(`pdf ${filename} eliminada del bucket`);
}

module.exports = {
  upload,
  subirImagen,
  deleteImageFromBucket,
  subirPdf,
  deletePdfFromBucket,
};
