import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import db from "./modelos/main";
import ejerciciosRutas from "./rutas/ejercicios.rutas";
import usuarioRutas from "./rutas/usuario.rutas";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

db.mongoose
	.connect(process.env.MONGODB ?? "")
	.then(() => {
		console.log("Conectado a la base de datos");
	})
	.catch((err) => {
		console.log(
			"ERROR : No se puede establecer la conexion con la base de datos.",
		);
		console.log(
			"Asegurese que la base de datos esta en ejecución y lance de nuevo la aplicación.",
		);
		process.exit();
	});

// const corsOptions = {
//   origin: "https://wipace.ujaen.es"
// };

// app.use(cors(corsOptions));
app.use(express.json());

// Ruta de bienvenida al API

app.get("/", (req: Request, res: Response) => {
	res.send("Bienvenido al API de WIPACE");
});

// Importo las funciones del API
usuarioRutas(app);
ejerciciosRutas(app);

// Establece el puerto de escucha del API

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
