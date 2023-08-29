/*import express from 'express';
const app = express()

const products = [
    
    {id:"1",title:"TV Samsung 75",description:"TV Led 75",price:400, thumbnail:"sin imagen", code:"abc123", stock: 20},
    {id:"2",title:"TV Samsung 80",description:"TV Led 80",price:600, thumbnail:"sin imagen", code:"abc124", stock: 22},
    {id:"3",title:"Hitachi LC200",description:"Parlante Hitachi",price:250, thumbnail:"sin imagen", code:"abc125", stock: 30},
    {id:"4",title:"Phillips",description:"Home T",price:800, thumbnail:"sin imagen", code:"abc126", stock: 25},
    {id:"5",title:"Iphone 14 Pro",description:"Celular Iphone 14 Pro",price:1100, thumbnail:"sin imagen", code:"abc127", stock: 32},
    {id:"6",title:"Dell Latitude 2550",description:"Notebook Dell 2550",price:800, thumbnail:"sin imagen", code:"abc128", stock: 18},
    {id:"7",title:"Philco Cafetera",description:"Cafetera 5 lt",price:200, thumbnail:"sin imagen", code:"abc129", stock: 50},
    {id:"8",title:"Kohinoor frozen",description:"Heladera Kohinoor",price:650, thumbnail:"sin imagen", code:"abc1210", stock: 25},
    {id:"9",title:"Play Station 5",description:"Sony Play5",price:850, thumbnail:"sin imagen", code:"abc1211", stock: 40},
    {id:"10",title:"Air Apple",description:"Aplle Air",price:700, thumbnail:"sin imagen", code:"abc1212", stock: 45},
    {id:"11",title:"Camera IP Sica",description:"Camera IP Sica",price:50, thumbnail:"sin imagen", code:"abc1213", stock: 50},
]

app.get('/products',(req, res)=>{
    res.send({products});
})

app.get('/:idProduct',(req, res)=>{
    let idProduct = req.params.idProduct;
    let product = products.find(p=>p.id===idProduct);
    if(!product) return res.send({error: "Producto no encontrado"});
    res.send({product});
})

app.listen(8080, ()=> console.log('Servidor arriba en el puerto 8080'))*/

import express from 'express';
const app = express()

import fs from 'fs';
import { describe } from 'node:test';
import ProductManager from 'Entregable2';

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
    let product = manager.getProducts().find(p=>p.id===idProduct);
    if(!product) return res.send({error: "Producto no encontrado"});
    res.send({product});
})

app.listen(8080, ()=> console.log('Servidor arriba en el puerto 8080'))