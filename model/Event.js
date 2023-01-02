const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const eventSchema=new Schema({
name:{type:String,required:true},
location:{type:String,required:true},
stime:{type:String,required:true},
etime:{type:String,required:true},
ownerEmail:{type:String,required:true},
},{timestamps:true})


const Event=mongoose.model('Event',eventSchema)

module.exports=Event