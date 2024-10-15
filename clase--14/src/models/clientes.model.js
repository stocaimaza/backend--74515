//Instalamos mongoose: npm i mongoose
//Importamos mongoose: 
import mongoose from "mongoose";

//Definimos el "schema": 
//Esto es un objeto que nos permite definir la forma de los documentos. Configuramos el nombre de los campos y los tipos de datos que almacenarán. 

const clienteSchema = new mongoose.Schema({
    nombre: String, 
    apellido: String,
    edad: Number
})

//Definimos el modelo: 
const ClienteModel = mongoose.model("clientes", clienteSchema); 

export default ClienteModel; 