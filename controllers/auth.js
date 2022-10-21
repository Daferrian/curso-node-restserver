const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const { mail, password } = req.body;

    try {
        
        const usuario = await User.findOne({mail})
        if(!usuario){
            return res.status(400).json({
                msg: 'User / password are not correct - mail'
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'User / password are not correct - status: false'
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'User / password are not correct - password'
            })
        }

        const token = await generarJWT(usuario.id);

        
        res.json({
            usuario,
            token,
        })

    } catch (error) {
                
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })

    }

    

}

module.exports = {
    login
}