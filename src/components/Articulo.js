export default class Articulo {
	constructor(nombre, precio) {
		this.nombre = nombre;
		this.precio = precio;
	}

	getNombre() {
		return this.nombre;
	}

	setNombre(nombre) {
		this.nombre = nombre;
	}

	getPrecio() {
		return this.precio;
	}

	setPrecio(precio) {
		this.precio = precio;
	}
}
