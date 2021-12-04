const util = require('util');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage')

var storage = new GridFsStorage({
    url: "mongodb://localhost/user",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      //return new Promise((resolve,reject) => {
        
        const match = ["image/png", "image/jpeg"];
    
        if (match.indexOf(file.mimetype) === -1) {
          const filename = file.originalname;
          return filename;
        }
    
        const fileObject = {
          bucketName: 'photos',
          files: [
            {isim: 'ahmet', soyisim: "gok"},
            {moruq: 'sa', soy: 'kayı'}
          ]
        };

        return fileObject;
        /* return {
          bucketName: 'photos',
          filename: file.originalname
        }; */
        /* const fileInfo = {
          bucketName: 'photos',
          filename: file.originalname
        }
        resolve(fileInfo); */
      //});
      
    }
  });
  
var uploadFiles = multer({ storage: storage }).array("files[]");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
/* var uploadFiles = multer({storage: storage});
module.exports = uploadFiles; */