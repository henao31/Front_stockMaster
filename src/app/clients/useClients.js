import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import Clients from "./page";

const useClients = () => {

  const [cliente, setCliente] = useState([]);
    
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [clientesFiltrados, setClientesFiltrados] = useState(cliente);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editClients, setEditClients] = useState({
    cliente_id: '',
    nombre: '',
    contacto: '',
    direccion: '',
    telefono: '',
    correo: ''
  }); 
  
  const [newClients, setNewClients] = useState({
    nombre: '',
    contacto: '',
    direccion: '',
    telefono: '',
    correo: ''
  });

    useEffect(() => {
        getDataInit();
    }, []);
  
    useEffect(() => {
      getDataInit();
    }, [refreshData]);
  

  useEffect(() => {
    const resultados = cliente.filter(cliente =>
      cliente.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.contacto?.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.direccion?.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.telefono?.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.correo?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setClientesFiltrados(resultados);
  }, [busqueda, cliente]);


  const getDataInit = async () => {
    try {
      const response = await fetch('http://localhost:3001/clientes');

      // Verifica si la respuesta es correcta
      if (!response.ok) {
        throw new Error('Error al obtener clientes: ' + response.statusText); // Manejo de errores si la respuesta no es correcta
      }

      const result = await response.json(); // Obtener el resultado en formato JSON

      
      orderClientsById(result);
      console.log('Datos obtenidos:', result); // Imprimir los datos obtenidos
      return result; // Retornar la información de productos
    } catch (error) {
      console.error('Error:', error.message); // Loguear el error
      throw new Error('Error en la solicitud: ' + error.message); // Manejo de errores
    }
  };

  const orderClientsById = (clients) => {
    const clientsOrder = clients.sort((a, b) => a.id - b.id);
    setCliente(clientsOrder);
  }

  const handleAddClients = async (e) => {
    e.preventDefault();
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
      setRefreshData(!refreshData);
      const result = await response.json();
      setCliente([...cliente, result]);
      setNewClients({ nombre: '', contacto: '', direccion: '', telefono: '', correo: '' }); 
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };  


  const handleUpdateClients = async (e) => {
    e.preventDefault();
    const updatedClients = {
      cliente_id: editClients.cliente_id,
      nombre: editClients.nombre,
      contacto: editClients.contacto,
      direccion: editClients.direccion,
      telefono: editClients.telefono, 
      correo: editClients.correo
    };
    try {
      const response = await fetch(`http://localhost:3001/clientes/${editClients.cliente_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClients)  
      });
      if (response.ok) {
        setIsEditModalOpen(false);
        setEditClients({
          cliente_id: '',
          nombre: '',
          contacto: '',
          direccion: '',
          telefono: '', 
          correo: ''
        });
        alertUpdate();
        setRefreshData(!refreshData);
        // setBusqueda('');
      } else {
        alertError();
      }
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    } 
  }

  const handleDeleteClients = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/clientes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {  
        setRefreshData(!refreshData);
        console.log('Cliente eliminado correctamente');
      } else {
        console.error('Error al eliminar el cliente');
      }
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  } 

  
  const handleEditClients = (id) => {
    setIsEditModalOpen(true);
    const Clients = cliente.find(cliente => cliente.cliente_id === id);
    setEditClients(Clients);
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
  const alertDelete = (id, nombre) => {
    Swal.fire({
    title: "¿Estás seguro? ",
    text: "Esta acción es irreversible. ¿Quieres continuar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
          handleDeleteClients(id)
          Swal.fire({
              title: "Eliminado!",
              text: `El cliente (${nombre}) ha sido eliminado.`,
              icon: "success"
          });
      }
    });
  }

  // alerta de creacion de cliente
  const alertCreate = () => {
    Swal.fire({
      title: "Cliente creado",
      text: "El cliente ha sido creado correctamente",
      icon: "success"
    });
  } 

  // alerta de actualización de cliente
  const alertUpdate = () => {
    Swal.fire({
      title: "Cliente actualizado",
      text: "El cliente ha sido actualizado correctamente",
      icon: "success"
    });
  }

  // alerta de error
  const alertError = () => {
    Swal.fire({
      title: "Error",
      text: "Hubo un error al actualizar el cliente",
      icon: "warning"
    });
  }


  // paginador
  // ... otros estados ...
  const [paginaActual, setPaginaActual] = useState(1);
  const clientesPorPagina = 8; // Ajusta este número según necesites

  // Calcular clientes para la página actual
  const indiceUltimo = paginaActual * clientesPorPagina;
  const indicePrimero = indiceUltimo - clientesPorPagina;
  const clientesActuales = clientesFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };



    return {
      cliente,
      formatText,
      handleAddClients,
      isModalOpen,
      setIsModalOpen,
      newClients,
      setNewClients,
      handleUpdateClients,
      handleDeleteClients,
      handleEditClients,
      isEditModalOpen,
      setIsEditModalOpen,
      editClients,
      setEditClients,
      busqueda,
      setBusqueda,
      clientesFiltrados,
      alertDelete,
      clientesActuales,
      paginaActual,
      cambiarPagina,
      totalPaginas
    }
}

export default useClients;