import TipoProveedor from './TipoProveedor';

export default class Proveedor extends TipoProveedor {
	constructor(nombre, email, telefono, articulos = [], internacional, pais) {
		super(internacional, pais);
		this.nombre = nombre;
		this.email = email;
		this.telefono = telefono;
		this.articulos = articulos;
	}

	getNombre() {
		return this.nombre;
	}

	setNombre(nombre) {
		this.nombre = nombre;
	}

	getEmail() {
		return this.email;
	}

	setEmail(email) {
		this.email = email;
	}

	getTelefono() {
		return this.telefono;
	}

	setTelefono(telefono) {
		this.telefono = telefono;
	}

	getArticulos() {
		return this.articulos;
	}

	setArticulos(articulos) {
		if (articulos === null) return;

		const articuloExiste = this.articulos.find(
			(articulo) => articulo.nombre === articulos.nombre
		);
		if (articuloExiste) {
			articuloExiste.precio =
				Number.parseInt(articuloExiste.precio) +
				Number.parseInt(articulos.precio);

			return 'Existe';
		}

		this.articulos.push(articulos);
	}

	getInfoProveedor() {
		return {
			nombre: this.nombre,
			email: this.email,
			telefono: this.telefono,
			articulos: this.articulos,
			internacional: this.internacional,
			pais: this.pais,
		};
	}
}
