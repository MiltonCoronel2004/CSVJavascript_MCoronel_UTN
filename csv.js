import fs from 'fs/promises'
import path from 'path'

const DIR = './csvs'

export class CSV {
    constructor() {
        this.dir = DIR
    }

    async init() {
        await fs.mkdir(this.dir, { recursive: true })
    }

    async crearArchivo(nombre) {
        const filePath = path.join(this.dir, `${nombre}.csv`)
        const encabezado = 'ID,Producto,Stock,Precio\n'
        await fs.writeFile(filePath, encabezado)
        console.log(`Archivo creado: ${filePath}`)
    }

    async listarArchivos() {
        const archivos = await fs.readdir(this.dir)
        if (archivos.length === 0) {
            console.log('No hay archivos CSV.')
        } else {
            console.log('Archivos disponibles:')
            archivos.forEach(a => console.log('File', a))
        }
    }

    async leerArchivo(nombre) {
        const filePath = path.join(this.dir, `${nombre}.csv`)
        try {
            const contenido = await fs.readFile(filePath, 'utf-8')
            console.table(
                contenido
                    .trim()
                    .split('\n')
                    .slice(1)
                    .map(linea => {
                        const [ID, Producto, Stock, Precio] = linea.split(',')
                        return { ID, Producto, Stock, Precio }
                    })
            )
        } catch {
            console.log('o se pudo leer el archivo. ¿Existe?')
        }
    }

    async agregarProducto(nombre, producto) {
        const filePath = path.join(this.dir, `${nombre}.csv`)
        try {
            await fs.appendFile(filePath, `${producto.ID},${producto.Producto},${producto.Stock},${producto.Precio}\n`)
            console.log('Producto agregado.')
        } catch {
            console.log('Error al agregar producto.')
        }
    }

    async borrarArchivo(nombre) {
        const filePath = path.join(this.dir, `${nombre}.csv`)
        try {
            await fs.unlink(filePath)
            console.log('Archivo eliminado.')
        } catch {
            console.log('No se pudo borrar el archivo.')
        }
    }
}
