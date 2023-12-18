import mongoose from 'mongoose'
let isConnected:boolean = false;
export const connectToDatabase = async() =>
{
    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URL) 
    return console.log('Missing mongo url');
if(isConnected)
{
    return console.log("Mongo DB is already connected");
}
try
{
    await mongoose.connect(process.env.MONGODB_URL,{
        dbName:'OverFlow'
    })
    isConnected = true

}
catch(error)
{
console.log(error);

}
}