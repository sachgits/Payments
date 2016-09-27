/**
 * Created by gitonga on 9/26/2016.
 */
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
import {
nodeInterface
} from '../nodesInterfaces';

import {mpesaTypeFunc} from './MpesaTransactionType';
import {transactionTypeFunc} from './TransactionType';

export  function userTypeFunc(interfaceNode, name) {
    return new GraphQLObjectType({
        name: name,
        description: 'A Mpesa Transaction',
        fields: () => ({
            id: globalIdField('Mpesa', ({ _id }) => _id),
            username: {
                type: GraphQLString,
                description: 'Users user name',
                resolve: ({ username }) => username,
            },accessToken: {
                type: GraphQLString,
                description: 'users access token',
                resolve: ({ accessToken }) => accessToken,
            },totalAamount: {
                type: GraphQLInt,
                description: 'amount in the transaction',
                resolve: ({ totalAmount }) => totalAmount,
            },
            avatar: {
                type: GraphQLString,
                description: 'User who claimed the transaction',
                resolve: ({ avatar }) => avatar,
            },
            isActive: {
                type: GraphQLBoolean,
                description: 'is user active or not',
                resolve: ({ isActive }) => isActive,
            },
            cashTransactions: {
                type: transactConnection,
                description: 'users cash transactions',
                resolve: ({ cashTransaction }) => cashTransaction,
            },
            claimedMpesa: {
                type: mpesaConnection,
                description: 'is user active or not',
                resolve: ({ mpesaLoads }) => mpesaLoads,
            },
        }),
        interfaces: [interfaceNode],
    });
}

const {
    connectionType: mpesaConnection,
    edgeType: mpesaEdge
} = connectionDefinitions({
    name: 'MpesaTransaction',
    nodeType: mpesaTypeFunc(nodeInterface,"mpesaTransact")
});

const {
    connectionType: transactConnection,
    edgeType: transactEdge
} = connectionDefinitions({
    name: 'Transaction',
    nodeType: transactionTypeFunc(nodeInterface,"transact")
});