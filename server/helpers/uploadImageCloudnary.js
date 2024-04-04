const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.PUBLIC_URL_CLOUD_NAME,
    api_key: process.env.PUBLIC_URL_API_KEY,
    api_secret: process.env.PUBLIC_URL_API_SECRET
});
const uploadFile = async (filedata) => {
    try {
        const result = await cloudinary.uploader.upload(filedata, {
            resource_type: 'auto',
        });// Log the result from Cloudinary
        console.log(result)
        return result;
    } catch (error) {
        console.log('Error uploading to Cloudinary:', error.message);
        throw error; // Re-throw the error for visibility in the calling function
    }
};


const deleteFileCloudnary = async (public_id)=>{
    try {
        const response = await cloudinary.uploader.destroy(public_id)
        return response
    } catch (error) {
        console.log('Error uploading to Cloudinary:', error.message);
        throw error; 
    }
}
module.exports = {
    uploadFile,
    deleteFileCloudnary
}