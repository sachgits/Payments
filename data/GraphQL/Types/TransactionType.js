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

import{
    globalIdField
} from 'graphql-relay';

export function transactionTypeFunc (interfaceNode, name) {
    return new GraphQLObjectType({
        name: name,
        description: 'A Transaction',
        fields: () => ({
            id: globalIdField('Transaction', ({ _id }) => _id),
            _id: {
                type: GraphQLString,
                description: 'Mpesa transaction id',
                resolve: ({ _id }) => _id,
            },
            sender: {
                type: GraphQLString,
                description: 'user sending the transaction',
                resolve: ({ sender }) => sender,
            },reciever: {
                type: GraphQLString,
                description: 'User who recieves cash from the transaction',
                resolve: ({ reciever }) => reciever,
            },purchase: {
                type: GraphQLString,
                description: 'what was the user purchasing',
                resolve: ({ purchase }) => purchase,
            },
            amount: {
                type: GraphQLString,
                description: 'amount in the transaction',
                resolve: ({ amount }) => amount,
            },
            timeStamp: {
                type: GraphQLString,
                description: 'time transaction happened',
                resolve: ({ timeStamp }) => timeStamp,
            },
        }),
        interfaces: [interfaceNode],
    });
}
