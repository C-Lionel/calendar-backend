// const express = require('express'); // Exportamos express nuevamente para poder tener el IntelliSense 
const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');


const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }


        user = new User(req.body);

        // Encrypt password

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        
        await user.save();

        // Generar JWT

        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador..'
        })
    }
}






const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese Email'
            });
        }

        // Confirmar los passwords

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // Generar JWT

        const token = await generarJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador..'
        })

    }


}

const revalidateToken = async (req, res = response) => {

    // const uid = req.uid;
    // const name = req.name;

    const { uid, name } = req;

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid, name,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
};