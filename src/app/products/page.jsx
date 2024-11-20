"use client";

import useProducts from "./useProducts";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import Modal from "../components/Modal/Modal";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


const Products = () => {
  const {
    producto,
    formatText,
    handleAddProduct,
    isModalOpen,
    setIsModalOpen,
    newProduct,
    setNewProduct,
    handleUpdateProduct,
    handleDeleteProduct,
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
  } = useProducts();


  return (
    <div className="container mx-auto pt-6 px-8 flex flex-col gap-4">
      <div className="w-full flex flex-row gap-2 items-center">
        <div className="w-full flex flex-row justify-between gap-2 items-center">
          <div className="text-2xl font-bold flex flex-row gap-2 items-center mb-2">
            <div>Agregar Productos</div>
            <button
              className="bg-[#7F88D5] text-white font-bold py-2 px-4 rounded-md"
              onClick={() => setIsModalOpen(true)}>
              <MdAdd />
            </button>
          </div>
        </div>
        <div className="relative flex flex-row gap-2 items-center">
          <FiSearch className="absolute left-2 text-2xl text-gray-500"/>
          <input
            className="p-2 pl-10 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none"
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
      <div className="min-w-full overflow-y-auto h-[60vh] shadow-lg mt-2 shadow-slate-300 rounded-lg">
        <table className="min-w-full table-auto bg-white  rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-5">ID</th>
              <th className="py-3 px-5">Nombre</th>
              <th className="py-3 px-5">Categoria</th>
              <th className="py-3 px-5">Descripción</th>
              <th className="py-3 px-5">Precio</th>
              <th className="py-3 px-5">Cantidad</th>
              <th className="py-3 px-5">Proveedor</th>
              <th className="py-3 px-5">Fecha de Creación</th>
              <th className="py-3 px-5">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md  font-normal">
            {productosActuales.map((producto) => (
              <tr
                key={producto.producto_id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {producto.producto_id}
                </td>
                <td className="py-3 px-6 text-left">{producto.nombre}</td>
                <td className="py-3 px-6 text-left">{producto.categoria_id}</td>
                <td className="py-3 px-6 text-left">{formatText(producto.descripcion)}</td>
                <td className="py-3 px-6 text-left">{producto.precio}</td>
                <td className="py-3 px-6 text-center">{producto.stock}</td>
                <td className="py-3 px-6 text-center">{producto.proveedor_id}</td>
                <td className="py-3 px-6 text-center">
                  {new Date(producto.fecha_ingreso).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEditProduct(producto.producto_id)}
                    className="bg-blue-500 text-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => alertDelete(producto.producto_id, producto.nombre)}
                    className="bg-red-500 text-lg hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end">
        <div className="flex items-center gap-2 bg-white p-4 rounded-lg text-lg shadow">
          <button
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className={`p-2 rounded-full ${paginaActual === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
              }`}
          >
            <IoIosArrowBack />
          </button>

          {(() => {
            let paginas = [];
            if (totalPaginas <= 5) {
              // Si hay 5 o menos páginas, mostrar todas
              paginas = [...Array(totalPaginas)].map((_, i) => i + 1);
            } else {
              // Si estamos en las primeras 3 páginas
              if (paginaActual <= 3) {
                paginas = [1, 2, 3, '...', totalPaginas];
              }
              // Si estamos en las últimas 3 páginas
              else if (paginaActual >= totalPaginas - 2) {
                paginas = [1, '...', totalPaginas - 2, totalPaginas - 1, totalPaginas];
              }
              // Si estamos en medio
              else {
                paginas = [1, '...', paginaActual, '...', totalPaginas];
              }
            }

            return paginas.map((pagina, index) => (
              pagina === '...' ? (
                <span key={`dots-${index}`} className="px-2 text-gray-500">...</span>
              ) : (
                <button
                  key={index}
                  onClick={() => cambiarPagina(pagina)}
                  className={`w-8 h-8 rounded-full ${paginaActual === pagina
                      ? 'bg-[#7F88D5] text-white'
                      : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
                    }`}
                >
                  {pagina}
                </button>
              )
            ));
          })()}

          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className={`p-2 rounded-full ${paginaActual === totalPaginas
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
              }`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {isEditModalOpen === true ? (
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-2">Editar Producto</h2>
        <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
        <form
          className="w-[500px]  flex flex-col justify-center gap-4 "
          onSubmit={handleUpdateProduct}>
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            placeholder="Nombre"
            value={editProduct.nombre}  
            onChange={(e) => setEditProduct({ ...editProduct, nombre: e.target.value })}
            required
          />
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            placeholder="Descripción"
            value={editProduct.descripcion} 
            onChange={(e) => setEditProduct({ ...editProduct, descripcion: e.target.value })}
            required
          />
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="number"
            placeholder="Precio"
            value={editProduct.precio}  
            onChange={(e) => setEditProduct({ ...editProduct, precio: e.target.value })}
            required
          />
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="number"
            placeholder="Cantidad"
            value={editProduct.stock}  
            onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
            required
          />
          <select
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            value={editProduct.categoria_id}  
            onChange={(e) => setEditProduct({ ...editProduct, categoria_id: e.target.value })}
            required
          >
            <option disabled value="">Selecciona una categoría</option>
            {
              categorias.map((categoria) => (
                <option key={categoria.categoria_id} value={categoria.categoria_id}>
                  {categoria.nombre}
                </option>
              ))
            }
          </select>
          <select
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            value={editProduct.proveedor_id}  
            onChange={(e) => setEditProduct({ ...editProduct, proveedor_id: e.target.value })}
            required
          > 
            <option disabled value="">Selecciona un proveedor</option>
            {
              proveedores.map((proveedor) => (
                <option key={proveedor.proveedor_id} value={proveedor.proveedor_id}>
                  {proveedor.nombre}
                </option>
              ))
            }
          </select>
          <div className="flex justify-end gap-2"> 
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-md">
                Cancelar
              </button>
              <button
                type="submit"
                onClick={handleUpdateProduct}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                Editar
              </button>
          </div>
        </form>
      </Modal>
      ) :
      null
      }

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-2">Agregar Producto</h2>
        <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
        <form
          className="w-[500px]  flex flex-col justify-center gap-4 "
          onSubmit={handleAddProduct}>
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            placeholder="Nombre"
            value={newProduct.nombre}
            onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })} required
          />
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            placeholder="Descripción"
            value={newProduct.descripcion}
            onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
            required
          />
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="number"
            placeholder="Precio"
            value={newProduct.precio}
            onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
            required
          />
          <input
            className="p-2 border border-gray-300 rounded-md outline-none "
            type="number"
            placeholder="Cantidad"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            required
          />
          <select
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            value={newProduct.categoria_id}  
            onChange={(e) => setNewProduct({ ...newProduct, categoria_id: e.target.value })}
            required
          >
            <option disabled value="">Selecciona una categoría</option>
            {
              categorias.map((categoria) => (
                <option key={categoria.categoria_id} value={+categoria.categoria_id}>
                  {categoria.nombre}
                </option>
              ))
            }
          </select>
          <select
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            value={newProduct.proveedor_id}  
            onChange={(e) => setNewProduct({ ...newProduct, proveedor_id: e.target.value })}
            required
          > 
            <option disabled value="">Selecciona un proveedor</option>
            {
              proveedores.map((proveedor) => (
                <option key={proveedor.proveedor_id} value={+proveedor.proveedor_id}>
                  {proveedor.nombre}
                </option>
              ))
            }
          </select>
          <div className="flex justify-end gap-2"> 
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-md">
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
              Agregar
            </button>
          </div>
        </form>
      </Modal>
      
    </div>
  );
};

export default Products;