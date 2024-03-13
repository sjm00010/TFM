import mongoose from "mongoose";

import Matriz from "./Matriz.modelo.js";
import Mohr from "./Mohr.modelo.js";
// Imports de los distintos ejercicios
import Viga from "./Viga.modelo.js";
import usuario from "./usuario.modelo.js";

mongoose.Promise = global.Promise;

type DataBase = {
	mongoose: typeof mongoose;
	url: string;
	usuario: any;
	Viga: any;
	Matriz: any;
	Mohr: any;
};

const db: DataBase = {
	mongoose: mongoose,
	url: process.env.MONGODB ?? "",
	usuario: null,
	Viga: null,
	Matriz: null,
	Mohr: null,
};

db.usuario = usuario(mongoose);

// Uso de los distintos ejercicios
db.Viga = Viga(mongoose);
db.Matriz = Matriz(mongoose);
db.Mohr = Mohr(mongoose);

export default db;
