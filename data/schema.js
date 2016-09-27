import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

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
import {nodeField,nodeInterface} from '../data/GraphQL/nodesInterfaces';
import {
User,
findAllUsers,
findUserByUserName,
findUserById
} from '../data/Mongo/Schemas/UserSchema';

import {
findVerifiedMpesaById,
findAllVerifiedMpesas
}from '../data/Mongo/Schemas/MpesaLoadSchema';
import {
    findTransactionById,
findAllTransactions
}from '../data/Mongo/Schemas/CashTransferSchema';
import {
userTypeFunc
} from '../data/GraphQL/Types/UserType';
import {
mpesaTypeFunc
}from '../data/GraphQL/Types/MpesaTransactionType';
import {
    transactionTypeFunc
}from '../data/GraphQL/Types/TransactionType';
import {addPurchaseMutation} from "../data/GraphQL/Mutations/PurchaseMutation";
import {addMpesaMutation} from "../data/GraphQL/Mutations/MpesaClaimMutation";

/* Query Type */
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        user: {
            type: userTypeFunc(nodeInterface,'User'),
            args:{
                username: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (root,{username}) => findUserByUserName(username),
        },
        allUsers:{
            type: userConnection,
            description:"All users list",
            args: connectionArgs,
            resolve: (root,args)=> connectionFromPromisedArray(findAllUsers(),args)
        },
        mpesaTransactions: {
            type: mpesaConnection,
            description:"All mpesa list",
            args: connectionArgs,
            resolve: (root,args)=> connectionFromPromisedArray(findAllVerifiedMpesas(),args)
        },
        transactions:{
            type: transactConnection,
            args:connectionArgs,
            description: 'All transactions we have had so far',
            resolve: (root,args)=> connectionFromPromisedArray(findAllTransactions(),args)
        }
    })
});

/** Mutations **/
/* Mutation Type */
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addPurchase: addPurchaseMutation("purchaseMutation",transactEdge),
        claimMpesa: addMpesaMutation("mpesaMutation",mpesaEdge),
        /*removeTodo: RemoveTodoMutation,*/
    }),
});


const {
    connectionType: mpesaConnection,
    edgeType: mpesaEdge
} = connectionDefinitions({
    name: 'transactionMpesa',
    nodeType: mpesaTypeFunc(nodeInterface,"transactionMpesa")
});

const {
    connectionType: transactConnection,
    edgeType: transactEdge
} = connectionDefinitions({
    name: 'purchases',
    nodeType: transactionTypeFunc(nodeInterface,"purchases")
});
const {
    connectionType: userConnection
} = connectionDefinitions({
    name: 'AllUsers',
    nodeType: userTypeFunc(nodeInterface,"users")
});

export default new GraphQLSchema({
    query: queryType,
    mutation:mutationType
})