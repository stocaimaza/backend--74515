/** CLASE 17 - MONGO AVANZADO 2 **/

//Temas de hoy: 
//1) Agregaciones
//2) Paginacion

////PIZZERIA "EL CODIGO LOCO". 

import mongoose from "mongoose";
import OrderModel from "./models/order.model.js";

const main = async () => {
    mongoose.connect("mongodb+srv://coderhouse74515:coderhouse@cluster0.xv444.mongodb.net/MongoAvanzado?retryWrites=true&w=majority&appName=Cluster0")

    //Ejercicio 1: Calculamos el total de las pizzas vendidas por sabores pero solo en el tamaño familiar.

    // const resultado = await OrderModel.aggregate([
    //     {
    //         $match: {
    //             tam: "familiar"
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: "$nombre",
    //             total: {
    //                 $sum: "$cantidad"
    //             }
    //         }
    //     },
    //     //Ejercicio 2: 
    //     {
    //         $sort: {
    //             total: -1
    //             // 1 ascendente
    //             // - 1 descendente
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: 10,
    //             orders: {
    //                 $push: "$$ROOT"
    //             }
    //         }
    //     }, 
    //     {
    //         $project: {
    //             _id: 0, 
    //             orders: "$orders"
    //         }
    //     }, 
    //     {
    //         $merge: {
    //             into: "reports"
    //         }
    //     }

    // ])


    // console.log(resultado);

    //PAGINACION: 

    const resultado = await OrderModel.paginate({}, {limit: 4, page: 2})
    console.log(resultado);
}

//main(); 
//////////////////////////////////////////////////////////////////////////

import express from "express";
const app = express(); 
const PUERTO = 8080; 
import {engine} from "express-handlebars";

//BD
mongoose.connect("mongodb+srv://coderhouse74515:coderhouse@cluster0.xv444.mongodb.net/MongoAvanzado?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la base de datos"))
    .catch((error) => console.log("Tenemos un error: ", error))

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

//Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Rutas
app.get("/pizzas", async (req, res) => {
    const page = req.query.page || 1; 
    const limit = 2; 

    try {
        const pizzasListado = await OrderModel.paginate({}, {limit, page}); 

        //Recuperamos el array de datos que esta en docs: 
        const pizzas = pizzasListado.docs.map( pizza => {
            const {_id, ...rest} = pizza.toObject(); 
            return rest; 
        })

        res.render("index", {
            pizzas: pizzas, 
            hasPrevPage: pizzasListado.hasPrevPage,
            hasNextPage: pizzasListado.hasNextPage,
            prevPage: pizzasListado.prevPage, 
            nextPage: pizzasListado.nextPage,
            currentPage: pizzasListado.page, 
            totalPages: pizzasListado.totalPages
        })
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

//Listen

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})