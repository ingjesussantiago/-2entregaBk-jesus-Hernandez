const fs = require("fs")

class ProductManager {

    constructor(path) {

        this.path = path
    }

    getProduct = async () => {
        if (fs.existsSync(this.path)) {
            const buscarProduct = await fs.promises.readFile(this.path, "utf-8")
            const productos = JSON.parse(buscarProduct)
            return productos
        } else {
            console.log("no hay archivo");
            return []

        }
    }

    addProduct = async (producto) => {
        const productos = await this.getProduct()
        const id = this.#generarId(productos)
        const nuevoProducto = { id, ...producto }
        productos.push(nuevoProducto)

        await fs.promises.writeFile(this.path, JSON.stringify(productos))
        return nuevoProducto
    }

    getProductoById = async (id) => {
        const productos = await this.getProduct()
        const productoId = productos.find(u => u.id === id)
        if (productoId) {
            return productoId
        } else {
            return "producto no existe"
        }




    }

    upDateProduc = async (id, obj) => {
        const productos = await this.getProduct()
        const indexProductos = productos.findIndex((u) => u.id === id)
        if (indexProductos === -1) {
            return "no encontrado"
        }

        const productoActualizado = { ...productos[indexProductos], ...obj }
        productos.splice(indexProductos, 1, productoActualizado)
        await fs.promises.writeFile(this.path, JSON.stringify(productos))

    }

    delateProduct = async () => {
        if (fs.existsSync(this.path)) {
            await fs.promises.unlink(this.path)
            return "archivo eliminado"
        } else {
            return "este archivo no existe"
        }

    }

    delateProductById = async (id) => {
        const productos = await this.getProduct()
        const arrayNew = productos.filter((u) => u.id !== id)
        console.log(arrayNew);
        await fs.promises.writeFile(this.path, JSON.stringify(arrayNew))


    }

    #generarId = (productos) => {

        let id
        if (productos.length === 0) {
            id = 1
        } else {
            id = productos[productos.length - 1].id + 1
        }
        return id

    }

}

const productoCreado = {
    title: "camisas",
    costo: 20,
    stock: 5,
    DESCR: "HHHHHH2"
}


async function prueba() {
    const manager = new ProductManager("productos.json")
    //await manager.addProduct(productoCreado)
    const productos = await manager.getProduct()
    console.log(productos);
    // const productoid = await manager.getProductoById(3)
    // console.log(productoid);
    const n = await manager.upDateProduc(1, { title: "pantalon" })
    console.log(n);
}

prueba()