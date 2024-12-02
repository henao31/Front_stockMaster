import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const useReports = () => {

  const [ventas, setVentas] = useState([]);
    
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [ventasFiltradas, setVentasFiltradas] = useState(ventas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);


    useEffect(() => {
        getDataInit();
    }, []);
  
    useEffect(() => {
      getDataInit();
    }, [refreshData]);
  
  useEffect(() => {
    getProducts();
    getClients();
  }, []);

  useEffect(() => {

    // Crear una copia del array de ventas con las fechas formateadas
    const ventasConFechasFormateadas = ventas.map(venta => ({
      ...venta,
      fecha: new Date(venta.fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }));

    const sales = ventasConFechasFormateadas.map(venta => ({
      ...venta,
      nombreProducto: productos.find(producto => producto.producto_id === venta.cod_producto)?.nombre.toLowerCase()
    }));
    

    const resultados = sales.filter(venta =>
      venta.fecha?.includes(busqueda) ||
      venta.nombre_cliente?.toLowerCase().includes(busqueda.toLowerCase()) ||
      venta.nombreProducto?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setVentasFiltradas(resultados);
    console.log('ventasFiltradas ', resultados);
  }, [busqueda, ventas, productos]);


  const getProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/productos`);
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setProductos(data);
      } else {
        console.error('Los datos de productos no son un array:', data);
        setProductos([]);
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      setProductos([]);
    }
  }


  const getClients = async () => {
    try {
      const response = await fetch(`http://localhost:3001/clientes`);
      if (!response.ok) {
        throw new Error('Error al obtener clientes');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setClientes(data);
      } else {
        console.error('Los datos de clientes no son un array:', data);
        setClientes([]);
      }
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      setClientes([]);
    }
  }

  const getDataInit = async () => {
    try {
      const response = await fetch('http://localhost:3001/ventas');

      // Verifica si la respuesta es correcta
      if (!response.ok) {
        throw new Error('Error al obtener ventas: ' + response.statusText); // Manejo de errores si la respuesta no es correcta
      }

      const result = await response.json(); // Obtener el resultado en formato JSON

      
      orderVentasById(result);
      console.log('Datos obtenidos:', result); // Imprimir los datos obtenidos
      return result; // Retornar la información de productos
    } catch (error) {
      console.error('Error:', error.message); // Loguear el error
      throw new Error('Error en la solicitud: ' + error.message); // Manejo de errores
    }
  };

  const orderVentasById = (ventas) => {
    const ventasOrder = ventas.sort((a, b) => a.venta_id - b.venta_id);
    setVentas(ventasOrder);
  }





  

    
 const formatText = (text) => {
      if (text == null) {
        return text;
      }
      if (text.length > 30) {
        return text.slice(0, 30) + '...';
      }
      return text;
  };


  // paginador
  // ... otros estados ...
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 7; // Ajusta este número según necesites

  // Calcular productos para la página actual
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const ventasActuales = ventasFiltradas.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(ventasFiltradas.length / productosPorPagina);

  console.log('ventasActuales ', ventasActuales);
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };



    return {
      ventas,
      formatText,
      isModalOpen,
      setIsModalOpen,
      busqueda,
      setBusqueda,
      ventasFiltradas,  
      ventasActuales,
      paginaActual,
      cambiarPagina,
      totalPaginas,
      productos,
      clientes,
    }
}

export default useReports;