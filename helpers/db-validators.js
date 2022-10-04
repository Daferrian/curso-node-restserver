const Role = require('../models/role');
const User = require('../models/user');

const esRoleValido = async (role = '') => {
    const existeRole = await Role.findOne( {role} );
    if(!existeRole){
        throw new Error(`El rol ${role} no esta en la BD`);
    }
}

const mailRegistrado = async (mail = '') =>{
    const mailExist = await User.findOne({mail});
    if(mailExist){
        throw new Error('Este correo ya esta registrado');
        
    }
}

const existeUsuarioPorId = async (id) =>{
    const idExist = await User.findById(id);
    if(!idExist){
        throw new Error(`El id ${id} no existe`); 
    }
}


module.exports = {
    esRoleValido,
    mailRegistrado,
    existeUsuarioPorId
}