const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
dest:path.resolve(__dirname, "..", "..", "media"),
storage:multer.diskStorage({
destination: (req, file, cb) =>{
cb(null, path.resolve(__dirname, "..", "..", "media"))
},
filename: (req, file, cb) => {
crypto.randomBytes(16, (err, hash) => {
if (err) cb(err);

const fileName = `${hash.toString('hex')}-${file.originalname}`;
cb(null, fileName);
});
},

}),
limitis: {
fileSize:2 * 1024 * 1024,
},
fileFilter: (req, file, cb) => {
const allowedMimes = [
'image/jpeg',
'image/jpg',
'image/png'
];
if (allowedMimes.includes(file.mimetype)) {
cb(null, true);
} else {
cb(newError('Tipo de Arquivo Inválido'));
}
},
}