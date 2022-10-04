const {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const userGet = async(req, res = response) => {

    const { limit = 5, start = 0 } = req.query;
    const user = await User.find()
        .skip(Number(start))
        .limit(Number(limit));
        
    res.json({
        user
    });
}

const userPost = async (req, res) => {

    const {name, mail, password, role} = req.body;
    const user = new User({name, mail, password, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    await user.save();

    res.json({
        user
    });

}

const userPut = async (req, res) => {
    const {id} = req.params;
    const { password, google, mail, ...resto } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto);
    
    res.json({
        msg:'put API -Controller',
        id
    });
}

const userPatch = (req, res) => {

    const { nombre, edad } = req.body;

    res.json({
        msg:'patch API -Controller',
        nombre,
        edad,
    });
}

const userDelete = (req, res) => {

    const { nombre, edad } = req.body;

    res.json({
        msg:'delete API -Controller',
        nombre,
        edad,
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}