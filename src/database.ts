import mongoose from 'mongoose';

export const connect = () => {
    console.log("Connecting to the database!");
    return mongoose.connect('mongodb://localhost:27017/dreams-db', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export const port: Number = 4000;