import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import db from "../modelos/index.js";

const Usuario = db.usuario;

/**
 * POST : Creación de un nuevo docente
 * Esta operación no es accesible esta operación no es accesible desde la web y simplemente se utiliza para generar los usuarios al inicio. Será borrada en una futura actualización.
 * @param {*} req Petición
 * @param {*} res Respuesta
 */
export const crear = (req, res) => {
    const nuevoUsuario = new Usuario({
        ...req.body
    });

    Usuario.findOne({ usuario: nuevoUsuario.usuario })
        .then(data => {
            if (data) res.status(400).send({
                message: "Usuario ya existe."
            });
            else {
                nuevoUsuario.pass = bcrypt.hashSync(nuevoUsuario.pass, 12);

                nuevoUsuario
                    .save(nuevoUsuario)
                    .then(() => {
                        res.status(201).send();
                    })
                    .catch(err => {
                        res.status(400).send({
                            message: err.message || "ERROR: Se ha producido algun error mientras se creaba el usuario."
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "ERROR: Se ha producido algun error mientras se obtenian los datos de usuario."
            });
        });
};

/**
 * POST : Login de un docente (Autenticación)
 * @param {*} req Petición (NO SE UTILIZA)
 * @param {*} res Respuesta
 */
export const login = (req, res) => {
    if (req.get('authorization')) {
        const [usuario, pass] = (Buffer.from(req.get('authorization')?.split(' ').pop(), 'base64')).toString('utf-8').split(':');

        Usuario.findOne({ usuario })
            .then(data => {
                if (data && bcrypt.compareSync(pass, data.pass)) {
                    // Información que deseas incluir en el payload del token
                    const payload = {
                        username: usuario,
                    };

                    // Crear el token
                    const token = jwt.sign(payload, process.env.JWT_SECRET || "test", {
                        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
                    });

                    // Enviar el token en la respuesta
                    res.status(200).send({
                        token: token
                    });
                } else res.status(401).send({
                    message: "Usuario o contraseña incorrectos."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "ERROR: Se ha producido algún error mientras se obtenían los datos de usuario."
                });
            });
    } else {
        res.status(400).send({
            message: "No se proporcionaron correctamente las credenciales"
        });
    }
};

/**
 * Función que autentica el token de un usuario y que este no haya caducado
 * @param {*} req Petición
 * @param {*} res Respuesta
 * @param {*} next Siguiente función a ejecutar
 */
export const verificarAuth = (req, res, next) => {
    const token = (Buffer.from(req.get('authorization')?.split(' ').pop(), 'base64')).toString('utf-8');;

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET || "test", (err, _) => {
        if (err)
            return res.status(401).json({ message: 'Failed to authenticate token' });

        next();
    });
};