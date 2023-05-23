import './assets/css/bootstrap.min.css';
import Swal from 'sweetalert2/dist/sweetalert2.all';
import Proveedor from './components/Proveedor';
import Articulo from './components/Articulo';
import { getImpuestoTotal } from './assets/js/utils';

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer);
		toast.addEventListener('mouseleave', Swal.resumeTimer);
		toast.addEventListener('click', Swal.close);
	},
});

document.addEventListener('DOMContentLoaded', () => {
	const nombreProveedor = document.querySelector('#nombreProveedor');
	const emailProveedor = document.querySelector('#emailProveedor');
	const telefonoProveedor = document.querySelector('#telefonoProveedor');
	const paisProveedor = document.querySelector('#paisProveedor');
	const internacionalProveedor = document.querySelector(
		'#internacionalProveedor'
	);
	const proveedorSelect = document.querySelector('#proveedor');
	const nombreArticulo = document.querySelector('#nombreArticulo');
	const precioArticulo = document.querySelector('#precioArticulo');
	const agregarProveedor = document.querySelector('#agregarProveedor');
	const agregarArticulo = document.querySelector('#agregarArticulo');
	const tabla = document.querySelector('#tabla');

	const proveedores = [];

	const cargarSelectProveedores = () => {
		proveedorSelect.innerHTML =
			'<option disabled selected value="">Seleccione un proveedor</option>';

		proveedores.forEach((pro) => {
			const option = document.createElement('option');
			option.value = pro.nombre;
			option.textContent = pro.nombre;

			proveedorSelect.appendChild(option);
		});
	};

	const cargarTabla = async () => {
		if (proveedores.length === 0) {
			tabla.innerHTML = `
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colspan="7" class="text-center">No hay proveedores</td>
					</tr>
				</tbody>
			`;
			return;
		}

		tabla.innerHTML = '';

		const thead = document.createElement('thead');
		const tbody = document.createElement('tbody');
		const tr = document.createElement('tr');
		const thNombre = document.createElement('th');
		const thAcciones = document.createElement('th');

		thNombre.textContent = 'Nombre';
		thAcciones.textContent = 'Acciones';

		tr.appendChild(thNombre);
		tr.appendChild(thAcciones);

		thead.appendChild(tr);

		proveedores.forEach((proveedor) => {
			const tr = document.createElement('tr');
			const tdNombre = document.createElement('td');
			const tdAcciones = document.createElement('td');

			tdNombre.textContent = proveedor.nombre;
			tdAcciones.innerHTML = `
				<button class="btn btn-success btn-sm" id="infoProveedor" >Información Proveedor</button>
				<button class="btn btn-info btn-sm" id="impuestoTotal">Impuesto Total</button>
				<button class="btn btn-danger btn-sm" id="eliminarProveedor">Eliminar</button>
			`;

			tr.appendChild(tdNombre);
			tr.appendChild(tdAcciones);

			tbody.appendChild(tr);
		});

		tabla.appendChild(thead);
		tabla.appendChild(tbody);

		const infoProveedor = document.querySelectorAll('#infoProveedor');
		const impuestoTotal = document.querySelectorAll('#impuestoTotal');
		const eliminarProveedor = document.querySelectorAll('#eliminarProveedor');

		infoProveedor.forEach((info, index) => {
			info.addEventListener('click', () => {
				const selectedProveedor = proveedores[index];

				const proveedor = new Proveedor(
					selectedProveedor.nombre,
					selectedProveedor.email,
					selectedProveedor.telefono,
					selectedProveedor.articulos,
					selectedProveedor.internacional,
					selectedProveedor.pais
				);

				const infoProveedor = proveedor.getInfoProveedor();

				Swal.fire({
					title: 'Información Proveedor',
					html: `
						<p><b>Nombre:</b> ${infoProveedor.nombre}</p>
						<p><b>Email:</b> ${infoProveedor.email}</p>
						<p><b>Telefono:</b> ${infoProveedor.telefono}</p>
						<p><b>Internacional:</b> ${
							infoProveedor.internacional ? 'Nacional' : 'Internacional'
						}</p>
						<p><b>Pais:</b> ${infoProveedor.pais}</p>
						<p><b>N° de Articulos:</b> ${infoProveedor.articulos.length}</p>
					`,
					icon: 'info',
					confirmButtonText: 'Aceptar',
					confirmButtonColor: '#3085d6',
				});
			});
		});

		impuestoTotal.forEach((ver, index) => {
			ver.addEventListener('click', () => {
				const selectedProveedor = proveedores[index];

				const proveedor = new Proveedor(
					selectedProveedor.nombre,
					selectedProveedor.email,
					selectedProveedor.telefono,
					selectedProveedor.articulos,
					selectedProveedor.internacional,
					selectedProveedor.pais
				);

				const impuestoTotal = getImpuestoTotal(proveedor);

				Swal.fire({
					title: 'Impuesto Total',
					text: `El impuesto total es: ${impuestoTotal}`,
					icon: 'info',
					confirmButtonText: 'Aceptar',
					confirmButtonColor: '#3085d6',
				});
			});
		});

		eliminarProveedor.forEach((eliminar, index) => {
			eliminar.addEventListener('click', () => {
				proveedores.splice(index, 1);

				guardarLocalStorage();
				cargarSelectProveedores();
				cargarTabla();
			});
		});
	};

	const guardarLocalStorage = () => {
		localStorage.setItem('proveedores', JSON.stringify(proveedores));
	};

	const cargarLocalStorage = () => {
		const proveedoresLS = JSON.parse(localStorage.getItem('proveedores'));

		proveedores.push(...proveedoresLS);

		cargarSelectProveedores();
		cargarTabla();
	};

	cargarLocalStorage();

	agregarProveedor.addEventListener('submit', (e) => {
		e.preventDefault();

		if (nombreProveedor.value.trim() === '' || nombreProveedor.value === null) {
			Toast.fire({
				icon: 'error',
				title: 'El nombre del proveedor es requerido',
			});

			return;
		}

		if (emailProveedor.value.trim() === '' || emailProveedor.value === null) {
			Toast.fire({
				icon: 'error',
				title: 'El email del proveedor es requerido',
			});

			return;
		}

		if (
			telefonoProveedor.value.trim() === '' ||
			telefonoProveedor.value === null
		) {
			Toast.fire({
				icon: 'error',
				title: 'El telefono del proveedor es requerido',
			});

			return;
		}

		if (paisProveedor.value.trim() === '' || paisProveedor.value === null) {
			Toast.fire({
				icon: 'error',
				title: 'El pais del proveedor es requerido',
			});

			return;
		}

		const proveedorEncontrado = proveedores.find((proveedor) => {
			if (proveedor.nombre === nombreProveedor.value) {
				Toast.fire({
					icon: 'error',
					title: 'El nombre ya existe',
				});

				return proveedor;
			}

			if (proveedor.email === emailProveedor.value) {
				Toast.fire({
					icon: 'error',
					title: 'El email ya existe',
				});

				return proveedor;
			}

			if (proveedor.telefono === telefonoProveedor.value) {
				Toast.fire({
					icon: 'error',
					title: 'El telefono ya existe',
				});

				return proveedor;
			}
		});

		if (!proveedorEncontrado) {
			const proveedor = new Proveedor(
				nombreProveedor.value,
				emailProveedor.value,
				telefonoProveedor.value,
				[],
				internacionalProveedor.checked,
				paisProveedor.value
			);

			proveedores.push(proveedor);

			nombreProveedor.value = '';
			emailProveedor.value = '';
			telefonoProveedor.value = '';
			internacionalProveedor.checked = false;
			paisProveedor.value = '';

			guardarLocalStorage();
			cargarSelectProveedores();
			cargarTabla();
		}
	});

	agregarArticulo.addEventListener('submit', (e) => {
		e.preventDefault();

		if (nombreArticulo.value.trim() === '' || nombreArticulo.value === null) {
			Toast.fire({
				icon: 'error',
				title: 'El nombre del articulo es requerido',
			});

			return;
		}

		if (precioArticulo.value === 0 || precioArticulo.value < 0) {
			Toast.fire({
				icon: 'error',
				title: 'El precio del articulo es requerido',
			});

			return;
		}

		const selectedProveedor = proveedores.find(
			(proveedor) => proveedor.nombre === proveedorSelect.value
		);

		const articulo = new Articulo(nombreArticulo.value, precioArticulo.value);

		const proveedor = new Proveedor(
			selectedProveedor.nombre,
			selectedProveedor.email,
			selectedProveedor.telefono,
			selectedProveedor.articulos,
			selectedProveedor.internacional,
			selectedProveedor.pais
		);

		const res = proveedor.setArticulos(articulo);

		if (res === 'Existe') {
			Toast.fire({
				icon: 'info',
				title: 'El articulo ya existia, se actualizo el precio',
			});
		}

		nombreArticulo.value = '';
		precioArticulo.value = '';

		guardarLocalStorage();
		cargarSelectProveedores();
		cargarTabla();
	});
});
