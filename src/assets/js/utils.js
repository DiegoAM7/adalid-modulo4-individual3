import Proveedor from '../../components/Proveedor';

export const getImpuestoTotal = (prov) => {
	const proveedor = new Proveedor(
		prov.nombre,
		prov.email,
		prov.telefono,
		prov.articulos,
		prov.internacional,
		prov.pais
	);

	return proveedor.articulos.reduce((acc, articulo) => {
		return acc + Number.parseInt(articulo.precio);
	}, 0);
};
