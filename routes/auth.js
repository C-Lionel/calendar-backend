/*
    Rutas de Usuarios / Auth 
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validatorFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt')
const router = Router();

router.post(
    '/new',
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validatorFields
    ],
    createUser
);

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validatorFields
    ],
    loginUser);

router.get('/renew', validateJWT, revalidateToken);


module.exports = router;