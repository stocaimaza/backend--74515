import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse74515:coderhouse@cluster0.xv444.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la BD"))
    .catch( (error) => console.log("Tenemos un error ", error ))