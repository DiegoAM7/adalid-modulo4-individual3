export default class TipoProveedor {
	constructor(internacional = false, pais) {
		this.internacional = internacional;
		this.pais = pais;
	}

	getInternacional() {
		return this.internacional;
	}

	setInternacional(internacional) {
		this.internacional = internacional;
	}

	getPais() {
		return this.pais;
	}

	setPais(pais) {
		this.pais = pais;
	}

	getInfoProveedor() {
		return {
			nombre: this.nombre,
			email: this.email,
			telefono: this.telefono,
			internacional: this.internacional,
			pais: this.pais,
		};
	}
}
