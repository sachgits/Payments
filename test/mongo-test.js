/**
 * Created by gitonga on 9/21/2016.
 */
import mongoose from 'mongoose';
import {describe} from 'mocha';
import {should,assert,expect} from 'chai';
import {
User,
findUserById,
findUserByUserName,
findAllUsers,
transferCash,
addMpessLoadToUser,
saveUser
} from '../data/Mongo/Schemas/UserSchema';

import {
findAllTransactions,
findTransactionById,
Transact,
saveTransaction
} from '../data/Mongo/Schemas/CashTransferSchema';

import {
findAllVerifiedMpesas,
findVerifiedMpesaById,
verifyMpesa,
linkMpesaToUser,
VerifiedMpesa
} from '../data/Mongo/Schemas/MpesaLoadSchema';

describe('hooks', ()=>{
    before(function(){
        //runs before each test in this block
        //connect to mongoDB
        mongoose.Promise = global.Promise;
        let connect = mongoose.connect("mongodb://172.17.0.2/payment1").connection;

        connect
            .on('disconnected', console.log.bind(console, "disconnected"))
            .on('error', console.error.bind(console, "We hit an error"))
            .once('open', function(err){
                if(err){
                    console.error(err);
                }else{
                    console.log("connection open ");
                }
            });
    });

    describe("#UserSchema", ()=>{
        let sachgits = new User({username:"alanmaina",avatar:"http://fb.me/pish.maina/default.jpg",accessToken:"vJyuAG+_-=?by",
        totalAmount:200000,});
        /*it("it should save one user", function(){
            saveUser(sachgits).then(function(result){
                expect(result).to.have.keys('username','avatar','_id');
            },
            function(err){
                done(err);
            });
        });*/

        it("should find one of the saved user using username", function(){
            findUserByUserName("sachgits").then(function(result){
                assert.equal(result.username, 'blueduxx', "username should not match");
            },
            function (err) {
                done(err);
            });
        });
        it("should find user by ID", function(){
            //sample user ids
            //57e1d25328e4de2f052e2e9b
            //57e1d8582be5ae309086ce30
            //57e2a213b5c2dd4df9335b55 edithwangeci
            //57e2a27be687ce4e2002fb3a alanmaina
            findUserById("57e1d8582be5ae309086ce30").then(function(result){
                    assert.equal(result.username,'blueduxx', "username match");
                },
                function (err) {
                    done(err);
                });
        });
        it("find all users", function(){
            findAllUsers().then(function(results){
                assert.equal(result.length, 2, "were the results equal");
            },
            function(err){
                done(err);
            });
        });
    });

    describe("Transaction operations", function(){
        let trans = new Transact({from:"57e2a27be687ce4e2002fb3a",to:"57e2a213b5c2dd4df9335b55",
            purchase:"Wiflix Daily",amount:50});
        it("save transaction", function () {
            saveTransaction(trans).then(function(results){
                assert.equal(results,1,"Not equal on purpose");
            },function(err){
                done(err);
            })
        })
    });

    describe("find Transaction by id", function () {
        //57e1d25328e4de2f052e2e9b
        it("finds all transaction with the id 57e26b5da7d0f6424d3974d9",function () {
            findTransactionById("57e26b5da7d0f6424d3974d9").then(function(results){
                assert.equal(results,1,"not equal");
            },function(err){
                done(err);
            });
        });
        
        it("return all transactions", function () {
            findAllTransactions().then(function(results){
                expect(results).to.be.empty;
            },function(err){
                done(err);
            });
        });
    });

    describe("Mpesa operations", function(){
        it("links mpesa to user", function() {
            let mpesa = new VerifiedMpesa({
                amount: 500,
                transactionID: 'JK10BYU8TY90',
                phoneNumber: '0722222222'
            });

            linkMpesaToUser(mpesa).then(function (results) {
                console.log(results);
                assert.equal(results, 1, "should not be equal");
            }, function (err) {
                console.log(err);
            });
        });

        it("return all transactions", function () {
            findAllVerifiedMpesas().then(function(results){
                expect(results).to.be.empty;
            },function(err){
                done(err);
            });
        });

        it("verify Mpesa", function () {
            verifyMpesa("KRT20JPX123","0721169392").then(function(results){
                console.log(results);
                expect(results).to.be.empty;
            },function(err){
                done(err);
            });
        });
    });

    after(function(){
        //runs after all tests in this block
        mongoose.disconnect();
    });
});
