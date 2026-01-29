import mongoose from "mongoose"

interface Iuser{ //meaning Iuser interface hai user ka
_id?:mongoose.Types.ObjectId,  //define id  object type  in mongoose genereted in mongodb
name:string,
image:string 
password:string
email:string
createdAt?:Date,//define optional since mongodb define
updatedAt?:Date
}

//Define user schema user
const userSchema=new mongoose.Schema<Iuser>({
name:{type:String, //Define string in Capital String
     required:true
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
    
},
image:{
   type:String,
}
},{timestamps:true}) //define mongodb timestamps true then define createdAt&updatedAt

//define model

// const User=mongoose.model('User',userSchema) 
const User= mongoose.models.User || mongoose.model("User",userSchema) //define nextjs .create one time model does not override model 
export default User
