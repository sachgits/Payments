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

export  function mpesaTypeFunc(interfaceNode, name)
{
    return new GraphQLObjectType({
        name: name,
        description: 'A Mpesa Transaction',
        fields: () => ({
            id: globalIdField('Mpesa', ({_id}) => _id),
            _id: {
                type: GraphQLString,
                description: 'Mpesa transaction id',
                resolve: ({_id}) => _id,
            },
            transactionID: {
                type: GraphQLString,
                description: 'Transaction id confirmation code',
                resolve: ({transactionID}) => transactionID,
            }, mobileNumber: {
                type: GraphQLString,
                description: 'Transaction id confirmation code',
                resolve: ({phoneNumber}) => phoneNumber,
            }, amount: {
                type: GraphQLString,
                description: 'amount in the transaction',
                resolve: ({amount}) => amount,
            },
            verified: {
                type: GraphQLString,
                description: 'User who claimed the transaction',
                resolve: ({verified}) => verified,
            },
            timeStamp: {
                type: GraphQLString,
                description: 'time transaction happened',
                resolve: ({timeStamp}) => timeStamp,
            },
        }),
        interfaces: [interfaceNode],
    });
}
