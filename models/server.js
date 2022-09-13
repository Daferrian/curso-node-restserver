const express = require('express');
const cors = require('cors');


class Server{

    constructor(){

        //server config
        this.app = express();
        this.port = process.env.PORT;

        //paths
        this.userPath = '/api/users';
        

        //middlewares
        this.middlewares();
        this.routes();

    }

    middlewares(){

        //cors
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use( express.json() );
        
        //express
        this.app.use(express.static('public'));
    
    }

    routes(){

        //users
        this.app.use(this.userPath,require('../routes/user'));

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }

}

module.exports = Server