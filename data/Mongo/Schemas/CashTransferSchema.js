/**
 * Created by gitonga on 9/21/2016.
 */
import mongoose from "mongoose";
let Schema = mongoose.Schema;
import {
findUserById,
saveUser,
User
} from './UserSchema';

const TransactionSchema = new Schema({
    from:Schema.Types.ObjectId,
    to: Schema.Types.ObjectId,
    amount: {
        type: Number,
        required: true
    },
    purchase: {
        type:String,
        required:true
    },
    timeStamp:{
        type: Date,
        default:Date.now
    }
});

/*
*before any transaction occurs the amount must be deducted from from_user account and added to to_user account
* we also populate the userSchema fileds with object ids both from user document and to user document
 */
TransactionSchema.pre('save',function(next,done){
    //TODO: save the two together instead of to operations

    this.preSaveFunc(this.to,this._id, -1 * this.amount).then(function(results){
        console.log("results modified: " + results);
    },function (err) {
        console.log(err);
    });
    this.preSaveFunc(this.from,this._id, this.amount);
    next();//TODO: not the best place to put next what the two operations end up in errors
    setTimeout(100,done);//quick fix
});

TransactionSchema.methods.preSaveFunc = (user_id,transact_id,amount)=> {
    findUserById(user_id).then(function(results){
        console.log(results);
        if(amount < 0 || amount <= 500000){
            return new Promise((resolve,reject)=>
            {
                amount = 50000 - amount;
                User.where({_id: user_id}).update({$push: {cashTransaction: transact_id},$set:{totalAmount:amount}}).exec((err, res)=> {
                    err ? reject(err) : resolve(res);
                });
            });
        }else{
            console.log("because it hard with our current state");
            throw new Error("totalAmount:" + results.totalAmount + " less than service purchase " + amount);
        }
    },function(err){
        done(err);
    });

}

const Transact =  mongoose.model('Transaction', TransactionSchema);

module.exports.Transact = Transact;
/*
 *
 * pass findUserById the id as string you get back the asked user
 */
module.exports.findTransactionById = (id) => {//TODO: populate to come later after models have been added
    return new Promise((resolve, reject) => {
        Transact.find({_id:id}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};
/*
*find all transactions
 */
module.exports.findAllTransactions = () => {//TODO: populate to come later after models have been added
    return new Promise((resolve, reject) => {
        Transact.find({}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

/*
* save transaction
 */

module.exports.saveTransaction = (transact) => {
    return new Promise((resolve, reject) => {
        transact.save((err, res) => {
            err ? reject(err): resolve(res);
        });
    });
};