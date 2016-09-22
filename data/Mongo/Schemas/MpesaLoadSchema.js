/**
 * Created by gitonga on 9/22/2016.
 */
import mongoose from "mongoose";
let Schema = mongoose.Schema;
import {
    findUserById,
    saveUser
} from './UserSchema';

const VerifiedMpesaSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
transactionID: {
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    timeStamp:{
        type: Date,
        default:Date.now
    },
    verified:{
        type:Boolean,
        default:false
    }
});

/*
 *before any transaction occurs the amount must be deducted from from_user account and added to to_user account
 * we also populate the userSchema fileds with object ids both from user document and to user document
 */
VerifiedMpesaSchema.pre('save',function(next,done){
    //TODO: save the two together instead of to operations

    this.preSaveFunc();
    this.preSaveFunc();
    next();//TODO: not the best place to put next what the two operations end up in errors
    setTimeout(100,done);//quick fix
});

VerifiedMpesaSchema.methods.preSaveFunc = ()=>{
    console.log("about to save mpesa");
}

const VerifiedMpesa =  mongoose.model('VerifiedMpesa', VerifiedMpesaSchema);

module.exports.VerifiedMpesa = VerifiedMpesa;
/*
 *
 * pass findUserById the id as string you get back the asked user
 */
module.exports.findVerifiedMpesaById = (id) => {//TODO: populate to come later after models have been added
    return new Promise((resolve, reject) => {
        VerifiedMpesa.find({_id:id}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};
/*
 *find all transactions
 */
module.exports.findAllVerifiedMpesas = () => {//TODO: populate to come later after models have been added
    return new Promise((resolve, reject) => {
        VerifiedMpesa.find({}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

/*
 *find all transactions
 */
module.exports.verifyMpesa = (trans_id,phone_num) => {//TODO: populate to come later after models have been added
    return new Promise((resolve, reject) => {
        VerifiedMpesa.findOne({transactionID:trans_id,phoneNumber:phone_num}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};
/*
 * link Mpesa to user
 * //like the create function
 */

module.exports.linkMpesaToUser = (mpesa) => {
    return new Promise((resolve, reject) => {
        mpesa.save((err, res) => {
            err ? reject(err): resolve(res);
        });
    });
};