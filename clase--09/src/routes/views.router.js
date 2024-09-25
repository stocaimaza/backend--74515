import { Router } from "express";
const router = Router();

//Rutas

//Array de productos: 
const arrayProductos = [
    {nombre: "Fideos", descripcion: "Los mas ricos", precio: 100},
    {nombre: "Arroz", descripcion: "El que no se pasa", precio: 200},
    {nombre: "Helado", descripcion: "mas frio que el corazon de tu ex", precio: 150}
]

router.get("/", (req, res) => {

    const usuario = {
        nombre: "Tinki",
        apellido: "Winki",
        mayorEdad: true
    }


    res.render("index", {usuario, arrayProductos, titulo: "Express-Handlebars"});
})

//Mostramos el archivo contacto.handlebars: 
router.get("/contacto", (req, res) => {
    res.render("contacto"); 
})

//Mostramos el archivo productos.handlebars: 
router.get("/productos", (req, res) => {
    res.render("productos"); 
})

export default router; 