/**
 * Created by gitonga on 9/26/2016.
 */
import {
    toGlobalId,
    fromGlobalId,
    globalIdField,
    offsetToCursor,
    connectionArgs,
    nodeDefinitions,
    connectionFromArray,
    connectionDefinitions,
    connectionFromPromisedArray,
    mutationWithClientMutationId
} from 'graphql-relay';
import { getWithType, isType } from '@sketchpixy/rubix/lib/node/relay-utils';
import {
findTransactionById,
Transact
} from '../Mongo/Schemas/CashTransferSchema';
import {
verifyMpesa,
findVerifiedMpesaById,
} from '../Mongo/Schemas/MpesaLoadSchema';
import {
findUserByAccToken,
findUserById
} from '../Mongo/Schemas/UserSchema';
const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        let { type, id } = fromGlobalId(globalId);

        if (type === 'User') {
            return getWithType(findUserById(id), 'User');
        } else if (type === 'Transaction') {
            return getWithType(findTransactionById(id), 'Transaction');
        } else if (type === 'VerfiedMpesa') {
            return getWithType(findVerifiedMpesaById(id), 'VerifiedMpesa');
        }else {
            return null;
        }
    },
    (obj) => {
        if ( isType(obj, 'User') ) {
            return userType;//TODO:
        } else if ( isType(obj, 'Transaction') ) {
            return todoType;//TODO:
        }  else if ( isType(obj, 'VerifiedMpesa') ) {
            return todoType;//TODO:
        }else {
            return null;
        }
    }
);

export {nodeInterface,nodeField};