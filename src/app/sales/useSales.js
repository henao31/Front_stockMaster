import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const useSales = () => {

  const [producto, setProducto] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState(producto);
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [saleActive, setSaleActive] = useState(true);
  const [stateFormClients, setStateFormClients] = useState(false);

  const [productSale, setProductSale] = useState({});
  const [saleClient, setSaleClient] = useState({});
  const [client, setClient] = useState(null);
  const [clientes, setClientes] = useState([]);

  // paginador
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 7; // Ajusta este número según necesites

  // Calcular productos para la página actual
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const [newClients, setNewClients] = useState({
    nombre: '',
    contacto: '',
    direccion: '',
    telefono: '',
    correo: ''
  });  
  
  
  useEffect(() => {
    getDataInit();
    getProveedores();
    getCategorias();
    getClients();
  }, []);

  const handleAddClients = async (e) => {
    e.preventDefault();
    console.log('cliente a agregar ', newClients);
    try {
      const response = await fetch('http://localhost:3001/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClients)
      });

      if (!response.ok) {
        alertError();
        throw new Error('Error al agregar cliente: ' + response.statusText);
      }

      alertCreate();
      setStateFormClients(true);
      // setRefreshData(!refreshData);
      const result = await response.json();
      console.log('cliente agregado ', result);
      client.cliente_id = result.id;
      client.nombre = result.nombre;
      console.log('cliente ', client);
      setNewClients({ nombre: '', contacto: '', direccion: '', telefono: '', correo: '' }); 
      // setIsModalOpen(false);
      // setSaleActive(true);

      if(response.ok){
        console.log('productos actuales ', productSale);
      }
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  }; 


  const handleAddSale = async (e) => {
    e.preventDefault();
    console.log('producto a agregar ', client);
    // saleClient.nombre_cliente = client.nombre;
    saleClient.total = productSale.total;
    saleClient.cliente_id = client.cliente_id;
    saleClient.cod_producto = productSale.producto_id;
    saleClient.cantidad = productSale.cantidad;
    console.log('cliente a agregar ', saleClient);
    try {
      const response = await fetch('http://localhost:3001/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleClient)
      });

      if (!response.ok) {
        alertError();
        throw new Error('Error al agregar cliente: ' + response.statusText);
      }

      alertCreateSale();
      setStateFormClients(false);
      setSaleActive(true);
      // setRefreshData(!refreshData);
      const result = await response.json();
      console.log('venta agregada ', result);

      setProductSale({}); 
      // setIsModalOpen(false);
      // setSaleActive(true);

      if(response.ok){
        console.log('productos actuales ', productSale);
      }
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  }; 

  const getClients = async () => {
    const response = await fetch(`http://localhost:3001/clientes`);
    const data = await response.json();
    setClientes(data);
    console.log('clientes ', data);
  }

  


  useEffect(() => {
    const resultados = producto.filter(producto =>
      producto.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(resultados);
  }, [busqueda, producto]);

  const getProveedores = async () => {
    const response = await fetch('http://localhost:3001/proveedores');
    const data = await response.json();
    data.forEach(proveedor => {
      proveedores.push({
        proveedor_id: proveedor.proveedor_id,
        nombre: proveedor.nombre
      });
    });
  }

  const getCategorias = async () => {
    const response = await fetch('http://localhost:3001/categorias');
    const data = await response.json();
    data.forEach(categoria => {
      categorias.push({
        categoria_id: categoria.categoria_id,
        nombre: categoria.nombre
      });
    });
    console.log(categorias);
  }


  const getDataInit = async () => {
    try {
      const response = await fetch('http://localhost:3001/productos');

      // Verifica si la respuesta es correcta
      if (!response.ok) {
        throw new Error('Error al obtener productos: ' + response.statusText); // Manejo de errores si la respuesta no es correcta
      }

      const result = await response.json(); // Obtener el resultado en formato JSON

      
      orderProductsById(result);
      console.log('Datos obtenidos:', result); // Imprimir los datos obtenidos
      return result; // Retornar la información de productos
    } catch (error) {
      console.error('Error:', error.message); // Loguear el error
      throw new Error('Error en la solicitud: ' + error.message); // Manejo de errores
    }
  };

  const orderProductsById = (products) => {
    const productsOrder = products.sort((a, b) => a.producto_id - b.producto_id);
    setProducto(productsOrder);
  }


 

  useEffect(() => {
    console.log(productSale);
  }, [productSale]);
  
  const handleAddProductToSale = (id) => {
    // Obtener la fecha actual en formato dd/mm/aaaa
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Si ya existe un producto en la venta
    if (Object.keys(productSale).length > 0) {
      // Si es el mismo producto, incrementar cantidad
      if (productSale.producto_id === id) {
        if (productSale.cantidad < productSale.stock) {
          setProductSale({
            ...productSale,
            cantidad: productSale.cantidad + 1,
            total: (productSale.precio * (productSale.cantidad+1) + productSale.precio * (productSale.cantidad+1)*0.19).toFixed(2)
          });
        } else {
          alert('No hay suficiente stock para agregar más productos');
        }
      } else {
        // Si es un producto diferente, mostrar mensaje o manejar según necesites
        alert('Ya hay un producto diferente en la venta');
      }
    } else {
      // Si no hay producto en la venta, agregar el nuevo
      const product = productosActuales.find(producto => producto.producto_id === id);

      if (product) {
        product.categoria = categorias.find(categoria => categoria.categoria_id === product.categoria_id).nombre;

        setProductSale({
          ...product,
          cantidad: 1,
          fecha_venta: fechaFormateada,
          total: (product.precio * 1+product.precio * 1*0.19).toFixed(2)
        });
        console.log(productSale);
      }
    }
  };



  const handleBuy = (product) => {
    if(Object.keys(product).length > 0){
      setSaleActive(false);
      console.log('compra realizada ', product);
    }else{
      alert('No hay productos en la venta');
    }

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


  const alertCreate = () => {
    Swal.fire({
      title: "Cliente creado",
      text: "El cliente ha sido creado correctamente",
      icon: "success"
    });
  } 

  const alertCreateSale = () => {
    Swal.fire({
      title: "Venta creada",
      text: "La venta ha sido creada correctamente",
      icon: "success"
    });
  } 



    return {
      formatText,
      busqueda,
      setBusqueda,
      productosActuales,
      paginaActual,
      cambiarPagina,
      totalPaginas,
      handleAddProductToSale,
      productSale,
      setProductSale,
      saleActive,
      handleBuy,
      newClients,
      setNewClients,
      stateFormClients,
      setStateFormClients,
      handleAddClients,
      handleAddSale
    }
}

export default useSales;