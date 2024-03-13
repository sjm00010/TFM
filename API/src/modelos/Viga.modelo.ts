import { EjercicioSchema, Elemento, Formula, Tramo } from "./esquemas_aux.js";

// Esquema para un ejercicio de cálculo de apoyo en vigas
export default (mongoose) => {
	const schema = mongoose.Schema({
		...EjercicioSchema.obj,
		tramos: [Tramo],
		elementos: [Elemento],
		formulas: [Formula],
		auxiliares: [String],
		E: Number,
		I: Number,
	});

	schema.method("toJSON", function (this: any) {
		const { __v, _id, ...object } = this.toObject();
		object.id = _id;
		return object;
	});

	const EjViga = mongoose.model("ejercicios_vigas", schema);

	return EjViga;
};
