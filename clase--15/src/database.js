import mongoose from "mongoose"; 

mongoose.connect("mongodb+srv://coderhouse74515:coderhouse@cluster0.xv444.mongodb.net/Coderest?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectado a MongoDB"))
    .catch((error) => console.log("Tenemos un error, todo esta mal!", error))