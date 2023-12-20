const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        require: true
    },

    email :{
        type: String,
        require: true
    },

    work :{
        type: String,
        require: true
    },

    phone :{
        type: Number,
        require: true
    },

    password :{
        type: String,
        require: true
    },

    cpassword :{
        type: String,
        require: true
    },
    date :{

        type:Date,
        default: Date.now
    },

    messages: [
        {
            name :{
                type: String,
                require: true
            },
        
            email :{
                type: String,
                require: true
            },
            phone :{
                type: Number,
                require: true
            },
            message:{
                type:String,
                require: true
            }
        
        

        }
    ],

    tokens : [
        {
            token: {
                type: String,
                require: true
            }
        }

    ]
})


// hashing the password

userSchema.pre('save', async function(next)
{
    console.log("Hi I am inside bcrypt function")
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    
    }
    next();
})

// We are generating Token

userSchema.methods.generateAuthToken = async function() {

    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token

    }
    catch(err)
        {
            console.log(err);
        }
    
};

// storing the message

userSchema.methods.addMessage = async function(name, email, phone, message)
{
    try{

        this.messages = this.messages.concat({name:name, email:email, phone:phone, message:message});
        await this.save();
        return this.messages;

    }
    catch(err)
    {
        console.log(err)
    }

}


const User = mongoose.model('Registration', userSchema);

module.exports = User;