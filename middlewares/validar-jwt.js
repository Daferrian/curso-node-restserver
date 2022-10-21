const {response, request} = require('express')
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validarJWT = async (req, res = response, next) =>{
    
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const user = await User.findByIdAndUpdate(uid);

        if(!user){
            return res.status(401).json({
                msg:'Token no valido - usuario no existe en db'
            })
        }

        if( !user.estado ){
            return res.status(401).json({
                msg:'Token no valido - usuario con estado false'
            })  
        }

        req.user = user;

        // req.uid = uid;
        
        next();

    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })

    }

    //next();
}

module.exports = {
    validarJWT
}