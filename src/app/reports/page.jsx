"use client";

import useReports from "./useReports";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import Modal from "../components/Modal/Modal";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


const Reports = () => {
  const {
    busqueda,
    setBusqueda,
    ventasFiltradas,
    ventasActuales,
    paginaActual,
    cambiarPagina,
    totalPaginas,
    productos,
    clientes,
  } = useReports();


  return (
    <div className="container mx-auto pt-6 px-8 flex flex-col gap-4">
      <div className="w-full flex flex-row gap-2 items-center">
        <div className="w-full flex flex-row justify-between gap-2 items-center">
          <div className="text-4xl font-bold flex flex-row gap-2 items-center mb-2">
            <div>Inventario</div>
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
              <th className="py-3 px-5">Cantidad</th>
              <th className="py-3 px-5">Producto</th>
              <th className="py-3 px-5">Total</th>
              <th className="py-3 px-5">Cliente</th>
              <th className="py-3 px-5">Fecha de venta</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md  font-normal">
            {ventasActuales.map((venta) => (
              <tr
                key={venta.venta_id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {venta.venta_id}
                </td>
                <td className="py-3 px-6 text-left">{venta.cantidad}</td>
                <td className="py-3 px-6 text-left">
                  {productos.find(producto => producto.producto_id === venta.cod_producto)?.nombre}
                </td>
                <td className="py-3 px-6 text-left">{venta.total}</td>
                <td className="py-3 px-6 text-left">
                  {Array.isArray(clientes) && clientes.length > 0 
                    ? clientes.find(cliente => cliente.cliente_id === venta.cliente_id)?.nombre 
                    : 'Cargando...'}
                </td>
                <td className="py-3 px-6 text-center">
                  {venta.fecha}
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
    </div>
  );
};

export default Reports;