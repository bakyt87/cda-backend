const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Added to get around the deprecation warning: "Mongoose: promise (mongoose's default promise library) is deprecated"

// Load the schema
const adminSchema = require('./admin-schema.js');

module.exports = function(mongoDBConnectionString){

    let Admins; // defined on connection to the new db instance

    return {
        connect: function(){
            return new Promise(function(resolve,reject){
                let db = mongoose.createConnection(mongoDBConnectionString,{ useNewUrlParser: true, useUnifiedTopology: true });
                
                db.on('error', (err)=>{
                    reject(err);
                });
        
                db.once('open', ()=>{
                    Admins = db.model("Admins", adminSchema);
                    resolve();
                });
            });
        },
        getAdmin: function(){
            return new Promise((resolve,reject)=>{
            Admins.find().then(data=>{
                            resolve(data)
                        }).catch(err=>{
                            reject(err);
                        });
              
        })
    }
    }
}