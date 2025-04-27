import mongoose from 'mongoose';

const qrCodeSchema=new mongoose.Schema({
    longUrl:{
        type:String,
        required:true
    },
    qrCodeUrl:{
        type:String,//Cloudinary link to QR code
        required:true
    },
    lastScanned:{
        type:Date
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const QrCode=mongoose.model('QrCode',qrCodeSchema);

export default QrCode;