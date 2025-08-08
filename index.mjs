import { CSV } from './csv.js'
import { input } from './utils.mjs'

const gestor = new CSV()
await gestor.init()

let opcion = ''

while (opcion !== '5') {
    console.log('\n==== MENÚ CSV ====')
    console.log('1. Crear archivo CSV')
    console.log('2. Listar archivos')
    console.log('3. Leer archivo CSV')
    console.log('4. Agregar producto')
    console.log('5. Borrar archivo CSV')
    console.log('6. Salir')

    opcion = await input('Elige una opción: ')

    switch (opcion) {
        case '1':
            const nombre1 = await input('Nombre del archivo: ')
            await gestor.crearArchivo(nombre1)
            break

        case '2':
            await gestor.listarArchivos()
            break

        case '3':
            const nombre3 = await input('Nombre del archivo a leer: ')
            await gestor.leerArchivo(nombre3)
            break

        case '4':
            const nombre4 = await input('Nombre del archivo para agregar producto: ')
            const ID = await input('ID: ')
            const Producto = await input('Producto: ')
            const Stock = await input('Stock: ')
            const Precio = await input('Precio: ')
            await gestor.agregarProducto(nombre4, { ID, Producto, Stock, Precio })
            break

        case '5':
            const nombre5 = await input('Nombre del archivo a borrar: ')
            await gestor.borrarArchivo(nombre5)
            break

        case '6':
            console.log('Saliendo...')
            break

        default:
            console.log('Opción no válida.')
    }
}
