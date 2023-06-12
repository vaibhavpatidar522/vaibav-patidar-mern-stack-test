const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : [true , 'Please add a firstName']
    }, 
    lastName : {
        type : String,
        required : [true , 'Please add a lastName']
    }, 
    mobile : {
        type : String,
        required : [true , 'Please add a mobile number']
    } ,
    email : {
        type : String,
        required : [true , 'Please add an email address']
        ,unique : true
    },
    gender : {
        type : String,
        required : [true , 'Please add a gender']
    },
    status : {
        type : String,
        required : [true , 'Please add a status']
    }
    ,
    location : {
        type : String,
        required : [true , 'Please add a location']
    },
    selectedFile : {
        type : String,
        required : [true , 'Please add a profile']
    }
} ,
    {
    timestamps : true,

})

module.exports = mongoose.model('Users', usersSchema);