import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const useProducts = () => {

  const [producto, setProducto] = useState([]);
    
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState(producto);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  
  const [editProduct, setEditProduct] = useState({
    producto_id: '',
    nombre: '',
    descripcion: '',
    categoria_id: '',
    precio: '',
    stock: '',
    proveedor_id: ''
  }); 
  
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    categoria_id: '',
    precio: '',
    stock: '',
    proveedor_id: ''
  });

    useEffect(() => {
        getDataInit();
        getProveedores();
        getCategorias();
    }, []);
  
    useEffect(() => {
      getDataInit();
    }, [refreshData]);
  
  useEffect(() => {
    console.log(proveedores);
  }, [proveedores]);


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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log(newProduct);
    try {
      const response = await fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        alertError();
        throw new Error('Error al agregar producto: ' + response.statusText);
      }

      alertCreate();
      setRefreshData(!refreshData);
      const result = await response.json();
      setProducto([...producto, result]);
      setNewProduct({ nombre: '', descripcion: '', categoria_id: '', precio: '', stock: '', proveedor_id: '' }); 
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };  


  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      producto_id: editProduct.producto_id,
      nombre: editProduct.nombre,
      descripcion: editProduct.descripcion,
      categoria_id: editProduct.categoria_id,
      precio: editProduct.precio, 
      stock: editProduct.stock,
      proveedor_id: editProduct.proveedor_id
    };
    try {
      const response = await fetch(`http://localhost:3001/productos/${editProduct.producto_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)  
      });
      if (response.ok) {
        setIsEditModalOpen(false);
        setEditProduct({
          producto_id: '',
          nombre: '',
          descripcion: '',
          categoria_id: '',
          precio: '', 
          stock: '',
          proveedor_id: ''
        });
        alertUpdate();
        setRefreshData(!refreshData);
        // setBusqueda('');
      } else {
        alertError();
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    } 
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar el producto');
      }

      if (response.ok) {
        console.log('Producto eliminado correctamente');
        setRefreshData(!refreshData);
        alertDelete();
      } else {
        throw new Error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
      alertError('Error al eliminar el producto: ' + error.message);
    }
  };

  
  const handleEditProduct = (id) => {
    setIsEditModalOpen(true);
    const product = producto.find(producto => producto.producto_id === id);
    console.log(product);
    setEditProduct(product);
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

  /* ---------- alertas----------- */

  // alerta de eliminación  
  const alertDelete = () => {
    Swal.fire({
      title: "Producto eliminado",
      text: "El producto ha sido eliminado correctamente",
      icon: "success"
    });
  }

  // alerta de creacion de producto
  const alertCreate = () => {
    Swal.fire({
      title: "Producto creado",
      text: "El producto ha sido creado correctamente",
      icon: "success"
    });
  } 

  // alerta de actualización de producto
  const alertUpdate = () => {
    Swal.fire({
      title: "Producto actualizado",
      text: "El producto ha sido actualizado correctamente",
      icon: "success"
    });
  }

  // alerta de error
  const alertError = (message) => {
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error"
    });
  }


  // paginador
  // ... otros estados ...
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



    return {
      producto,
      formatText,
      handleAddProduct,
      isModalOpen,
      setIsModalOpen,
      newProduct,
      setNewProduct,
      handleUpdateProduct,
      handleDelete,
      handleEditProduct,
      isEditModalOpen,
      setIsEditModalOpen,
      editProduct,
      setEditProduct,
      busqueda,
      setBusqueda,
      productosFiltrados,
      alertDelete,
      productosActuales,
      paginaActual,
      cambiarPagina,
      totalPaginas,
      proveedores,
      categorias
    }
}

export default useProducts;