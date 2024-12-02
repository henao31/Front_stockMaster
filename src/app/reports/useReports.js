import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const useReports = () => {

  const [ventas, setVentas] = useState([]);
    
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [ventasFiltradas, setVentasFiltradas] = useState(ventas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productos, setProductos] = useState({});
  const [clientes, setClientes] = useState({});


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
    const resultados = ventas.filter(venta =>
      venta.fecha?.toLowerCase().includes(busqueda.toLowerCase()) 
    );
    setVentasFiltradas(resultados);
    console.log('ventasFiltradas ', resultados);
  }, [busqueda, ventas]);


  const getProducts = async () => {
    const response = await fetch(`http://localhost:3001/productos`);
    const data = await response.json();
    setProductos(data);
    console.log('productos ', data);
  }


  const getClients = async () => {
    const response = await fetch(`http://localhost:3001/clientes`);
    const data = await response.json();
    setClientes(data);
    console.log('clientes ', data);
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