/** CLASE 9 - MOTORES DE PLANTILLAS **/

//Temas de hoy: 
//1) ¿Que es un motor de plantilla?
//2) Handlebars, instalacion y uso. 
//3) Estructuras, condicionales y ciclos. 
//4) Organizamos el router de handlebars. 
//5) Trabajamos con la carpeta public, con js y css.

///////////////////////////////////////////

//1) Instalamos express-handlebars con el siguiente comando: npm i express-handlebars
//2) Lo importamos. 

import express from "express";
import {engine} from "express-handlebars"; 
import viewsRouter from "./routes/views.router.js"; 
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public"));

//Express-Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//Rutas
app.use("/", viewsRouter); 

app.listen(PUERTO, () => {
    console.log("Trabajando en el puerto 8080");
})

