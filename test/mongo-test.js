/**
 * Created by gitonga on 9/21/2016.
 */
import mongoose from 'mongoose';
import {should,assert,expect} from 'chai';
import  'chai-as-promised';
import {
User,
findUserById,
findUserByUserName,
transferCash,
addMpessLoadToUser,
saveUser
} from '../data/Mongo/Schemas/UserSchema';

describe('hooks', ()=>{
    before(function(){
        //runs before each test in this block
        //connect to mongoDB

        let connect = mongoose.connect("mongodb://172.17.0.2/payment1").connection;
        mongoose.Promise = global.Promise;
        connect
            .on('disconnected', console.log.bind(console, "disconnected"))
            .on('error', console.error.bind(console, "We hit an error"))
            .once('open', function(err,result){
                if(err){
                    console.error(err);
                }else{
                    console.log("connection open ");
                }
            });
    });

    describe("#UserSchema", ()=>{
        let sachgits = new User({username:"blueduxx",avatar:"http://fb.me/blueduxx/default.jpg",accessToken:"jDA39+_-=?by",
        totalAmount:10000,});
        /*it("it should save one user", function(){
            saveUser(sachgits).then(function(result){
                expect(result).to.have.keys('username','avatar','_id');
            },
            function(err){
                done(err);
            });
        }); */

        it("should find one of the saved user using username", function(){
            findUserByUserName("sachgits").then(function(result){
                assert.equal(result.username, 'blueduxx', "usename should not match");
            },
            function (err) {
                done(err);
            });
        });
        it("should find user by ID", function(){
            findUserById("57e1d25328e4de2f052e2e9b").then(function(result){
                console.log(result);
                    assert.equal(result.username,'blueduxx', "username match");
                },
                function (err) {
                    done(err);
                })
        })
    });

    after(function(){
        //runs after all tests in this block
        mongoose.disconnect();
    });
});
