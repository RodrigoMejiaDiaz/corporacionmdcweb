const express = require("express");
const router = express.Router();
const path = require("path");
const {
  upload,
  subirImagen,
  deleteImageFromBucket,
  subirPdf,
  deletePdfFromBucket,
} = require("./gcs");

// Load Categoria model
const Categoria = require("../../models/Categoria");

router.get("/test", (req, res) => res.send("categoria route testing!"));

// @route GET api/categorias
// @description Get all categorias
// @access Public
router.get("/categorias", (req, res) => {
  Categoria.find()
    .then((categorias) => res.json(categorias))
    .catch((err) =>
      res.status(404).json({ nohaycategoria: "No Categoria encontrada" })
    );
});

// @route GET api/categorias/:id
// @description Get single categoria by id
// @access Public
router.get("/categorias/:id", (req, res) => {
  Categoria.findById(req.params.id)
    .then((categoria) => res.json(categoria))
    .catch((err) =>
      res.status(404).json({ nohaycategoria: "No Categoria encontrada" })
    );
});

// Load Producto model
const Producto = require("../../models/Producto");

// @route GET api/productos
// @description Get all productos
// @access Public
router.get("/productos", (req, res) => {
  Producto.find()
    .then((productos) => res.json(productos))
    .catch((err) =>
      res.status(404).json({ nohayproductos: "No Productos encontrados" })
    );
});

// @route GET api/productos/:id
// @description Get single producto by id
// @access Public
router.get("/productos/:id", (req, res) => {
  Producto.findById(req.params.id)
    .then((producto) => res.json(producto))
    .catch((err) =>
      res.status(404).json({ nohayproductos: "No Productos encontrados" })
    );
});

// @route POST api/productos
// @description Add a new producto
// @access Public
router.post(
  "/productos",
  upload.fields([{ name: "img" }, { name: "pdf" }]),
  async (req, res) => {
    try {
      const { nombre, desc, marca, categoria } = req.body;
      let img = req.files["img"] ? req.files["img"][0] : undefined;
      let pdf = req.files["pdf"] ? req.files["pdf"][0] : undefined;

      if (img) {
        img = await subirImagen(req.files["img"][0]);
      } else {
        //imagen placeholder en caso de no subir imagen
        img =
          "https://storage.googleapis.com/corporacionmdc-imgs/soluciones.png";
      }

      if (pdf) {
        pdf = await subirPdf(req.files["pdf"][0]);
      } else {
        //espacio vacio en caso de no subir pdf
        pdf = "";
      }
      const nuevoProducto = new Producto({
        nombre,
        desc,
        marca,
        categoria,
        img,
        pdf,
      });
      const productoGuardado = await nuevoProducto.save();
      res.json(productoGuardado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: "Error al guardar el producto" });
    }
  }
);

// @route PUT api/productos
// @description Editar un producto
// @access Public
router.put(
  "/productos/:id",
  upload.fields([{ name: "img" }, { name: "pdf" }]),
  async (req, res) => {
    try {
      const { nombre, desc, marca, img, categoria, pdf } = req.body;

      // Verificar si existe el producto
      const productoExistente = await Producto.findById(req.params.id);

      if (!productoExistente) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }

      // Actualizar el producto
      productoExistente.nombre = nombre;
      productoExistente.desc = desc;
      productoExistente.marca = marca;
      productoExistente.categoria = categoria;
      if (productoExistente.img !== img) {
        const filename = path.basename(productoExistente.img);
        await deleteImageFromBucket(filename);
        const img = await subirImagen(req.files["img"][0]);
        productoExistente.img = img;
      }
      if (productoExistente.pdf !== pdf) {
        const filename = path.basename(productoExistente.pdf);
        if (filename !== "") {
          await deletePdfFromBucket(filename);
        }
        const pdf = await subirPdf(req.files["pdf"][0]);
        productoExistente.pdf = pdf;
      }

      const productoActualizado = await productoExistente.save();
      res.json(productoActualizado);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error en el servidor");
    }
  }
);

// @route DELETE api/productos/:id
// @desc Elimina un producto por su ID
// @access Public
router.delete("/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }
    const filenameImg = path.basename(producto.img);
    const filenamePdf = path.basename(producto.pdf);
    if (filenameImg !== "wienerglucosa.jpg") {
      await deleteImageFromBucket(filenameImg);
    }
    if (filenamePdf !== "") {
      await deletePdfFromBucket(filenamePdf);
    }

    await producto.deleteOne();

    res.json({ msg: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
});

module.exports = router;
