const {response} = require('express')


const userGet = (req, res = response) => {
    res.json({
        msg:'get API -Controller'
    });
}

const userPost = (req, res) => {

    const { nombre, edad } = req.body;

    res.json({
        msg:'post API -Controller',
        nombre,
        edad,
    });
}

const userPut = (req, res) => {

    const { nombre, edad } = req.body;

    res.json({
        msg:'put API -Controller',
        nombre,
        edad,
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