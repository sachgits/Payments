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