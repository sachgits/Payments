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
    sender:{type: Schema.Types.ObjectId,ref:'User'},
    reciever: {type:Schema.Types.ObjectId,ref:'User'},
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

TransactionSchema.pre('save', function(next,done){
    let amount = this.amount;
    return findUserById(this.sender).then(function(senderUser){
        if(amount < senderUser.totalAmount) {
            next();
        }
        else{//mechanisim to throw and catch errors
            done(new Error("Not enough balance in your account to perform the purchase"));
        }
    },function(err){
        console.log(err);
        done(err);
    });
});

/*
*before any transaction occurs the amount must be deducted from from_user account and added to to_user account
* we also populate the userSchema fileds with object ids both from user document and to user document
 */
TransactionSchema.post('save',function(next,done){
    //TODO: save the two together instead of to operations
    var reciever = this.reciever;
    var amount = this.amount;
    var transact_id = this._id;
    var deepPresaveFunc = this.preSaveFunc;
    this.preSaveFunc(this.sender, this._id, -1 *this.amount, 'sender').then(function(results){
        deepPresaveFunc(reciever,transact_id,amount,'reciever');
    },function(err){
        console.error(err)
    })

});

TransactionSchema.methods.preSaveFunc = (user_id,transact_id,amount,sender_reciever)=> {
    return findUserById(user_id).then(function(user){
        return new Promise((resolve,reject)=>{
            if(sender_reciever === 'reciever' || amount <= user.totalAmount){
                User.where({_id: user_id}).update({$push: {cashTransaction: transact_id},
                 $inc:{totalAmount:amount}})
                    .exec((err, res)=> {
                    err ? reject(err) : resolve(res);
                });
            }else{
                console.log("because it hard with our current state");
                reject(new Error("totalAmount:" + user.totalAmount + " less than service purchase " + amount));
            }
        });

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
        Transact.findOne({_id:id}).exec((err, res) => {
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