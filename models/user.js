const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    mail:{
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'El contraseña es obligatorio']
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        require: true,
        enum: ['ADMIN_ROLE','USER_ROLE','VENTAS_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user} = this.toObject();
    return user;
}

module.exports = model('User', UserSchema)