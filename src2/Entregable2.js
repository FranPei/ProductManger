//const fs = require('fs');
import fs from 'fs';
//const { describe } = require('node:test');
import { describe } from 'node:test';

    


class ProductManager {

    #products = [];
    #path = 'products.json'

    constructor () {
        //this.#products = [];
      /*  if(fs.existsSync(this.#path)){
            const lecturaProductos = fs.readFileSync(this.#path,'utf-8')
            this.#products = JSON.parse(lecturaProductos);
            return this.#products;
        } else {
            fs.writeFileSync(this.#path, '[]', 'utf-8');
            console.log("Archivo Creado");
        }*/
    }
    

    getProducts() {
        if(fs.existsSync(this.#path)){
            const lecturaProductos = fs.readFileSync(this.#path,'utf-8')
            this.#products = JSON.parse(lecturaProductos);
            return this.#products;
        } else {
            console.log("No se pudo leer archivo. Verificar que el archivo exista");
        }
        
    }

    addProducts(title, description, price, thumbnail, code, stock){

        const existeFile = fs.existsSync(this.#path);

        if(!existeFile){

            fs.writeFileSync(this.#path, '[]', 'utf-8');
            console.log("El archivo no existia pero ya fue creado");
        } else {
            const lecturaProductos = fs.readFileSync(this.#path,'utf-8')
            this.#products = JSON.parse(lecturaProductos);
            const codeProducto = this.#products.find(productos => productos.code === code);
            if (!codeProducto) {

                const producto = {
                    id: this.#products.length + 1,
                    title,
                    description,
                    price,
                    thumbnail: "sin Imagen",
                    code,
                    stock
                }
                
                this.#products.push(producto);
                fs.writeFileSync(this.#path, JSON.stringify(this.#products, null, 2), 'utf-8');
                console.log(`El producto: ${producto.title} con id: ${producto.id} se agregó correctamente`);
                return producto;
            } else {
                console.log(`El code no se puede repetir`);
                return;
            }
        }
    }


    getProductByID(idBuscado) {//let id_e;
        let title_e, id_e;
        let objeto_e = {};
        if(fs.existsSync(this.#path)){
            const lecturaProductos = fs.readFileSync(this.#path,'utf-8')
            this.#products = JSON.parse(lecturaProductos);
            //return this.#products;
            this.#products.forEach( productos => {
            const {id, title, description, price, thumbnail, code, stock} = productos;

            if(id === idBuscado){
                title_e = title;
                id_e = true;
                objeto_e = {
                    id: id,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                };
                return objeto_e;

               
            }
        })
        if(id_e) {
            console.log(objeto_e)
            return objeto_e;
        } else {
            console.log("Not Found");
        }

        } else {
            console.log("No se pudo leer archivo. Verificar que el archivo exista");
        }
    }

    updateProduct(id, act, dato){

        if(fs.existsSync(this.#path)){
            const lecturaProductos = fs.readFileSync(this.#path,'utf-8')
            this.#products = JSON.parse(lecturaProductos);
            //return this.#products;
            const actproductos = [...this.#products];
            const existe = this.#products.findIndex( productos => productos.id === id); 
            if(existe) {
                actproductos[existe] = {...actproductos[existe], [act]: dato}
                this.#products = actproductos;
                fs.writeFileSync(this.#path, JSON.stringify(this.#products, null, 2), 'utf-8');
                console.log(`El producto con id: ${id} se actualizó correctamente`);
                };
                

            } else {
                console.log("No se encuentra ese ID");
            }
    }

    deleteProduct(id) {

        if(fs.existsSync(this.#path)){
            const lecturaProductos = fs.readFileSync(this.#path,'utf-8')
            this.#products = JSON.parse(lecturaProductos);
            //return this.#products;
            const existe = this.#products.findIndex( productos => productos.id === id); 

            if(existe) {
                const filtrado = this.#products.filter(productos => productos.id !== id)
                console.log(filtrado)
                console.log(`El producto con id: ${id} se eliminó correctamente`);
                fs.writeFileSync(this.#path, JSON.stringify(filtrado, null, 2), 'utf-8');
            }
        
        } else {
        console.log("No se encuentra ese ID");
        }
    }

}



export default ProductManager; //define como export default productmanager
