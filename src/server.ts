import express from 'express';
import { connect, port } from './database';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// Initializing the express aplication
const app = express();

// Applying logging and parser middleware 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



// Connecting to the database and starting the express application
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    })
})




