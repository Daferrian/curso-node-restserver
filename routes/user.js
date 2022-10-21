const { Router } = require('express');
const { check } = require('express-validator');

const{
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

//const { validarCampos } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { tieneRole } = require('../middlewares/validar-roles');

const { esRoleValido, mailRegistrado, existeUsuarioPorId } = require('../helpers/db-validators')


const {
    userGet, 
    userPost, 
    userPatch, 
    userPut, 
    userDelete } = require('../controllers/user');

const router = Router();


router.get('/', userGet );

router.post('/', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('mail', 'El correo no es valido').isEmail(),
    check('mail').custom(mailRegistrado),
    check('password','El password debe ser mas de 6 letras').isLength({min: 6}),
    //check('role','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
], userPost);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
], userPut);

router.patch('/', userPatch);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], userDelete);





module.exports = router;