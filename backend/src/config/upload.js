const multer = require('multer') //multer irá tratar dos uploads de arquivos multipart form como imagens. Arquivos diferentes de json
const path = require('path')

module.exports = {
    storage: multer.diskStorage({ //forma como multer irá armazenar os arquivos
        destination: path.resolve(__dirname, '..', '..', 'uploads'), //path.resolve() garante passar o destino correto independente do sistema operacional, pois substituirá as vígulas pelas '\' '/' correspondentes do sistema operacional utilizado
        filename: (req, file, callback) => { //função para nomear o arquivo
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname, ext)

            callback(null, `${name}-${Date.now()}${ext}`)
        }
    })
}