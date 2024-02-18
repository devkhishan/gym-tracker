const mongoose = require('mongoose') 
const bcrypt = require('bcrypt')
const validator = require('validator') 

const Schema = mongoose.Schema 

const userSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 

    password: {
        type: String, 
        required: true
    }
})  

userSchema.statics.signup = async function(email,password){

    if(!email || !password){
        throw Error("All Fields must be filled.")
    }

    if(!validator.isEmail(email)){
        throw Error("Not a valid Email")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Not a Strong Password")
    }

    const exists = await this.findOne({email}) 

    if(exists){
        throw Error("Email already exists")
    } 

    const salt = await bcrypt.genSalt(10) 

    const hash = await bcrypt.hash(password,salt) 

    const user = await this.create({
        email, password: hash
    }) 

    return user
    
}


userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error("All Fields must be filled.")
    }

    const user = await this.findOne({email}) 

    if(!user){
        throw Error("Email is Incorrect")
    }

    const comp = await bcrypt.compare(password, user.password)

    if(!comp){
        throw Error("Password is Incorrect")
    }
    
    return user
}
module.exports = mongoose.model("User",userSchema)