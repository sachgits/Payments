import {
saveTransaction,
Transact,
findAllTransactions,
findTransactionById
} from "../data/Mongo/Schemas/CashTransferSchema";
import {
findUserByAccToken,
findUserById
} from "../data/Mongo/Schemas/UserSchema";
import {
verifyMpesa,
VerifiedMpesa,
findVerifiedMpesaById,
findAllVerifiedMpesas
} from "../data/Mongo/Schemas/MpesaLoadSchema";

export function saveTransact(sender_id,reciever_id,purchase,amount) {

    let transact = new Transact({
        sender: sender_id, reciever: reciever_id,
        purchase: purchase, amount: amount
    });
    saveTransaction(transact);
    return transact;
}

export function getUser(user_id){
    return findUserById(user_id);
}

export function verifyMpesaTransaction(user_id,transaction_code,phone_number){
    let mpesa = new VerifiedMpesa({transactionID:transaction_code,phoneNumber:phone_number,amount:500,verified:user_id});
    verifyMpesa(user_id,transaction_code,phone_number);
    return mpesa;
}