import { Router } from "express";
import ClienteModel from "../models/clientes.model.js";
const router = Router(); 

//Acá vamos a practicar con el CRUD de clientes. 

//1) Leer el listado de clientes: 

router.get("/", async (req, res) => {
    try {
        const clientes = await ClienteModel.find();
        res.send(clientes);
    } catch (error) {
        res.status(500).send("Error al obtener todos los clientes"); 
    }
})

//2) Subimos un nuevo cliente por postman: 

router.post("/", async (req, res) => {
    const nuevoCliente = req.body; 

    try {
        const cliente = new ClienteModel(nuevoCliente); 
        await cliente.save();
        //Lo guardo en la base de datos. 

        res.send("Cliente almacenado correctamente"); 
    } catch (error) {
        res.status(500).send("Error al crear un nuevo cliente"); 
    }
})


//3) Actualizamos un cliente por su id: 

router.put("/:id", async (req, res) => {
    try {
        const cliente = await ClienteModel.findByIdAndUpdate(req.params.id, req.body); 
        if(!cliente) {
            return res.status(404).send("Recurso no encontrado"); 
        }
        res.send("Cliente actualizado");
    } catch (error) {
        res.status(500).send("Error al actualizar el cliente");
    }
})

//4) Eliminamos un cliente por su ID: 

router.delete("/:id", async (req, res) => {
    try {
        const cliente = await ClienteModel.findByIdAndDelete(req.params.id); 
        if(!cliente) {
            return res.status(404).send("Cliente no encontrado"); 
        }

        res.send("Cliente eliminado"); 
    } catch (error) {
        res.status(500).send("Error al eliminar");
    }
})

export default router; 