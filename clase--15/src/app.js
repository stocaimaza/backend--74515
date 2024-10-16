/** PRACTICA INTEGRADORA N°1  **/

//Temas de repaso: 
//Express
//Router y multer
//Express- Handlebars
//MongoDB y Mongoose

//Actividad: Generar una versión propia y simplificada de Pinterest. 
//Almacenar usuarios/imagenes en MongoDB. 

///////////////////////////////////////////////////////////////////

import express from "express";
import { engine } from "express-handlebars";
import multer from "multer";
import imagenRouter from "./routes/imagen.router.js";
import "./database.js";
const app = express(); 
const PUERTO = 8080; 

//Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public")); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/img"); 
    }, 
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
})

app.use(multer({storage}).single("image")); 

//Rutas 
app.use("/", imagenRouter);

//Ponemos a escuchar a nuestro servidor: 
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`); 
} )



