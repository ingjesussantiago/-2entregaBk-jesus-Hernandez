const fs = require("fs")

const path = "productos.json"

class ProductManager {

    constructor(path) {
        
        this.path = path
    }

    getProduct = async () => {
        if (fs.existsSync(path)) {
            const infoProduct = await fs.promises.readFile(path, "utf-8")
            const productos = JSON.parse(infoProduct)
            return productos
        } else {
            console.log("no hay archivo");
            return []

        }
    }

    addProduct = async (producto) => {
        const productos = await this.getProduct()
        let id
        if (productos.length === 0) {
            id = 1
        } else {
            id = productos[productos.length - 1].id + 1
        }

        const nuevoProducto = { id, ...producto }
        productos.push(nuevoProducto)

        await fs.promises.writeFile(path, JSON.stringify(productos))
        return nuevoProducto
    }

    getProductoById = async () => { }

    upDateProduc = async () => { }

    delateProduct = async () => { }


}

const productoCreado = {
    title: "camisas",
    costo: 20,
    stock: 5,
    DESCR: "HHHHHH2"
}

async function prueba() {
    const manager = new ProductManager()
    // await manager.addProduct(productoCreado)
    const productos = await manager.getProduct()
    console.log(productos);
}

prueba()