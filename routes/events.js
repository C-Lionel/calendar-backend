/*
    Events Routes
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const { validatorFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt');
const { actualizarEvento, crearEvento, eliminarEvento, getEventos } = require('../controllers/events')

const router = Router();

// Todas las rutas deben de pasar por la validación del JWT
// Cada vez que se vea un use es un middleware
router.use(validateJWT);

router.get('/', getEventos);

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validatorFields
    ],
    crearEvento);

router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validatorFields
    ],
    actualizarEvento);

router.delete('/:id', eliminarEvento);


module.exports = router;
