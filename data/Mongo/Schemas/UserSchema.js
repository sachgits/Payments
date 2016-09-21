/**
 * Created by gitonga on 9/20/2016.
 */
import mongoose from "mongoose";
let Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    accessToken:{
        type: String,
        required:true
    },
    avatar:{
        type:String,
        unique:true
    },
    totalAmount:
    {
        type:Number,
        required:true,
        Default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    cashRecieved:[{type:Schema.Types.ObjectId, ref:"Recieved"}],
    cashTransfered:[{type:Schema.Types.ObjectId, ref:"Transfered"}],
    mpesaLoads:[{type:Schema.Types.ObjectId, ref:'Mpesa'}]
});

const User =  mongoose.model('User', UserSchema);

module.exports.User = User;
/*

 */
module.exports.saveUser = (user) => {
    return new Promise((resolve, reject) => {
        user.save((err, res) => {
            err ? reject(err): resolve(res);
        });
    });
};

/*
*
* pass findUserById the id as string you get back the asked user
 */
module.exports.findUserById = (id) => {//TODO: populate to come later after models have been added
    return new Promise((resolve, reject) => {
        User.find({_id:id}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};


/*
* pass it username and it will give you back the asked user
 */
module.exports.findUserByUserName = (usernm) => {
    return new Promise((resolve, reject) => {//Todo: add populate
        User.find({username:usernm}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

/*
* function assumes that its passed in a user and then new mpesaLoad Models
* from user requesting this and the new mpesa to be verified
 */
module.exports.addMpessLoadToUser = (user,mpesaload)=>{
mpesaload.save((err,res)=>{
    if(err){
        throw err;
    }
    user.mpesaLoads = res._id;
    user.save((err,res)=>{
        if(err){
            throw err;
        }
        console.log(res);
    })
})
}

/*
*@function assumes that its passed user as fast param and transfere object as second param
* from the requesting user user must have had enough acc balance to perform operation this check is
* done by the controller (user performing the operation and the transfer object itself
 */

module.exports.transferCash = (user,cashTransferObj)=>{

}

/*
*function assumes that the right user to recieve cash is the one passed as the first param and
* the recieve object (model) us
 */