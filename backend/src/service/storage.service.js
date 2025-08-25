
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_API_KEY,
    privateKey: process.env.PRIVATE_API_KEY,
    urlEndpoint: process.env.ENDPOINT_URL
});


async function uploadFile(file, filename) {

    const response = await imagekit.upload({
        file: file,
        fileName: filename,
        folder: "ai-capgen",
    })

    return response
}


module.exports = uploadFile;