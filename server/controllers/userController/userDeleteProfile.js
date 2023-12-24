const { deleteFileCloudnary } = require("../../helpers/uploadImageCloudnary")

const deleteProfileCloudnary = async(req,res)=>{
    try {

        const Public_id = req.params.id
        await deleteFileCloudnary(Public_id)
        res.status(200).json({message:'Previous photo delete deleted'})
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', error });
    }
}

module.exports={
    deleteProfileCloudnary
}