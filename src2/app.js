import express from 'express';
const app = express()

//import fs from 'fs';
//import { describe } from 'node:test';
import ProductManager from './Entregable2.js'; //importa el default export 
//import {ProductManage} from './Entregable2.js'; //importa especificamente el default export Produc Manager

let productosIn = [];

const manager = new ProductManager();
manager.getProducts();

app.get('/products',(req, res)=>{           // "/products?limite=nro"
  
    let limite = req.query.limite;
    if(!limite || !(limite > 0)) return res.send(manager.getProducts());
    res.send(manager.getProducts().slice(0,limite));
})

//console.log(productosIn.slice(0,10))

app.get('/products/:pid',(req, res)=>{
    let idProduct = req.params.pid;
    let product = manager.getProductByID(parseInt(idProduct));
    if(!product) return res.send({error: "Producto no encontrado"});
    res.send({product});
})

app.listen(8080, ()=> console.log('Servidor arriba en el puerto 8080'))
