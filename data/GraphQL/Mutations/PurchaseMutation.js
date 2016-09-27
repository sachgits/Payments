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
import {nodeInterface} from "../nodesInterfaces";
import {userTypeFunc} from "../Types/UserType";
import {saveTransact,getUser} from "../../database";


export function addPurchaseMutation(name,edgeType) {
    /*Purchase Mutations */
    return  mutationWithClientMutationId({
        name: name,
        inputFields: {
            sender_id: {type: new GraphQLNonNull(GraphQLString)},
            reciever_id: {type: new GraphQLNonNull(GraphQLString)},
            purchase: {type: new GraphQLNonNull(GraphQLString)},
            amount: {type: new GraphQLNonNull(GraphQLInt)},
        },
        outputFields: {
            /*todoEdge: {//TODO:must wait for population to return Transact Type first
             type: edgeType,
             resolve: ({ _id, sender, reciever,purchase,amount }) => {
             return getTodos().then((todos) => {
             /**
             We make use of offsetToCursor to figure out the todo item's offset
             instead of cursorForObjectInConnection. This is because
             cursorForObjectInConnection uses indexOf to do a shallow scan (
             instead of a deep scan) of items. We manually scan the todo list
             to find the location todo item and then use offsetToCursor to get
             the Relay equivalent base64 encoded representation of the offset.

             var offset = 0;

             // figure out where the todo item is located in the list of todos
             for (var i = 0; i < todos.length; i++) {
             if (todos[i]._id.equals(_id)) {
             // found the offset
             offset = i;
             break;
             }
             }

             return {
             cursor: offsetToCursor(offset),
             node: { _id, sender, reciever,purchase,amount },
             }
             });
             }
             },*/
            user: {
                type: userTypeFunc(nodeInterface, "MutationUser"),
                resolve: ({sender, reciever, purchase, amount}) => getUser(sender),
            },
            error: {
                type: GraphQLString
            }
        },
        mutateAndGetPayload: ({sender_id, reciever_id, purchase, amount}) => saveTransact(fromGlobalId(sender_id).id, fromGlobalId(reciever_id).id, purchase, amount)
    });
}