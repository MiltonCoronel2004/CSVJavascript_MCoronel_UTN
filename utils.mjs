import readline from 'readline'

/**
 * 
 * @param {*} texto 
 * @returns string
 */
export function input (texto) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    return new Promise(resolve => {
        rl.question(texto, (res) => {
            resolve(res)
            rl.close()
        })
    })
}