const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('../../aws-config.js');
const { Buffer } = require('buffer');
const ID = config.aws.ID;
const SECRET = config.aws.SECRET;
const BUCKET_NAME = config.aws.BUCKET_NAME;

AWS.config.update({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    region: 'eu-west-1'
})

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

function getImgBuffer(base64){
    const base64str = base64.replace(/^data:image\/\w+;base64,/,'');
    return Buffer.from(base64str, 'base64');
}

const fileName = 'test1.png';

const uploadFile = async () => {

    const imageData = fs.readFile('https://upload.wikimedia.org/wikipedia/commons/a/a8/Ataturk1930s.jpg'); // returns buffer

    const params = {
        Bucket: BUCKET_NAME,
        Key: `${Date.now()}-${fileName}`,
        Body: imageData
    };    
    s3.putObject(params, function (err, data) {
        if (err) {
          console.log("Error: ", err);
        } else {
          console.log(data);
        }
    });
};

const uploadJSON = (fileName) => {
    const fileContent = fs.readFileSync(fileName);

    const params = {
        Bucket: BUCKET_NAME,
        Key: 'iphonejson.png', // File name you want to save as in S3
        Body: {
            content: fileContent
           // {id: "2", name: "iphone2", content: fileContent}
        }
    };
    JSONwwwww
    // Uploading files to the bucket
    s3.putObject(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}

uploadFile();
//uploadJSON('iphonex.png')