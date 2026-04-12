import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema ({
    username : {
        type : String ,
        min : [ 3 , 'Username must be at least 3 characters'] ,
        required : [true , 'Please enter a username'] ,
        unique : [true , 'This username is already taken'] ,
    },
    email :{
        type : String ,
        required : [true , 'Please enter an email'] ,
        unique : [true , 'This email is already registered'] ,
    },
    password : {
        type : String ,
        required : [true , 'Please enter a password'] ,
        select : false ,
    }

} , { timestamps : true })



userSchema.pre('save' , async function () {
    if(!this.isModified('password')) return 
    this.password = await bcrypt.hash(this.password , 10)
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password , this.password)
}


const userModel = mongoose.model ('user' , userSchema)

export default userModel
