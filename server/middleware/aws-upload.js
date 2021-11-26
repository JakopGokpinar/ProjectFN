const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('../config/config.js');

const ID = config.aws.ID;
const SECRET = config.aws.SECRET;
const BUCKET_NAME = config.aws.BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (file) => {
    // Read content from the file
    const fileContent = fs.readFileSync(file);
    const fileKey = `${Date.now()}-${file}`
    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'asdf.png', // File name you want to save as in S3
        Body: fileContent
    };
    
    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
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

uploadFile('./iphonex.png');
//uploadJSON('iphonex.png')