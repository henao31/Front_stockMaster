"use client";

import useSales from "./useSales";
import { IoMdAdd } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";


const Sales = () => {
    const {
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
        handleAddClients,
        setStateFormClients,
        stateFormClients,
        handleAddSale
    } = useSales();


    return (
        <div className="container mx-auto pt-6 px-8 flex flex-row gap-4">
            {   saleActive &&
                <div className="flex flex-row gap-4">
                    <div className="w-full flex flex-col gap-3">
                        <div className="w-full flex flex-row gap-2 items-center">
                            <div className="relative flex flex-row gap-2 items-center">
                                <FiSearch className="absolute left-2 text-2xl text-gray-500" />
                                <input
                                    className="p-2 pl-10 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none"
                                    type="text"
                                    placeholder="Buscar producto..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className=" overflow-y-auto h-[60vh] shadow-lg mt-2 shadow-slate-300 rounded-lg">
                            <table className="min-w-full table-auto bg-white  rounded-lg">
                                <thead>
                                    <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-5">ID</th>
                                        <th className="py-3 px-5">Nombre</th>
                                        <th className="py-3 px-5">Descripción</th>
                                        <th className="py-3 px-5">Precio</th>
                                        <th className="py-3 px-5">Cantidad</th>
                                        <th className="py-3 px-5">Agregar</th>
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
                                            <td className="py-3 px-6 text-left">{formatText(producto.descripcion)}</td>
                                            <td className="py-3 px-6 text-left">{producto.precio}</td>
                                            <td className="py-3 px-6 text-center">{producto.stock}</td>
                                            <td className="py-3 px-6 text-center flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleAddProductToSale(producto.producto_id)}
                                                    className="bg-blue-500 text-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                                    <IoMdAdd />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full  flex justify-end">
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
                    <div className="w-full max-w-[400px] flex flex-col gap-3 h-[600px]  mt-3">
                        <div className="w-full flex flex-col gap-2 items-center">
                            <div className="text-3xl font-bold flex flex-row gap-2 items-center mb-2">
                                <div>Agregar Productos</div>
                            </div>
                            <div className="w-full flex h-[300px] flex-col justify-center  px-4  border-[3px] border-slate-300 rounded-lg ">
                                {
                                    productSale.producto_id &&
                                    <div className="w-full h-[190px]  flex flex-col rounded-lg shadow-md shadow-slate-300">
                                        <div className="w-full h-[80px] relative bg-[#818cf1] rounded-t-lg flex flex-col px-4 justify-center items-start">
                                            <div className="text-3xl font-medium text-white">{productSale.nombre}</div>
                                            <div className="text-md text-white">{productSale.fecha_venta}</div>
                                            <MdDelete onClick={() => setProductSale({})} className="absolute right-3 top-3 text-4xl text-white cursor-pointer hover:text-slate-300"/>
                                        </div>
                                        <div className="w-full h-[110px] bg-slate-100 rounded-b-lg flex py-4 flex-col px-4 justify-between">
                                            <div className="flex flex-row gap-2 items-center justify-between">
                                                <div className="text-2xl font-medium text-black">ID: {productSale.producto_id}</div>
                                                    <div className="px-2 py-1 bg-[#939df7] rounded-xl shadow-md shadow-slate-300 font-medium text-md text-white">{productSale.categoria}</div>
                                            </div>
                                            <div className="flex flex-row gap-2 items-center justify-between">
                                                <div className="text-lg font-medium text-black">Cantidad: {productSale.cantidad}</div>
                                                <div className="text-2xl font-medium text-black">$ {productSale.precio}</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="w-full flex flex-col gap-2 border-[3px] border-slate-300 py-5  bg-slate-100 rounded-lg">
                                <div className="w-full flex flex-row justify-between gap-2 px-10 text-xl font-medium">
                                    <div className="">IVA</div>
                                    <div className="">19%  $ {(productSale?.precio*productSale?.cantidad*0.19).toFixed(2) | 0}</div>
                                </div>
                                <div className="w-full flex flex-row justify-between gap-2 px-10 text-xl font-medium">
                                    <div className="">Total a pagar</div>
                                    <div className="">$ {productSale?.total | 0}</div>
                                </div>
                            </div>
                            <div className="w-full flex justify-end mt-3">
                                <div onClick={()=>handleBuy(productSale)} className="bg-[#7F88D5] text-white px-5 text-2xl py-4 font-semibold rounded-lg hover:bg-[#939efa] hover:text-black cursor-pointer">
                                    Comprar
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {!saleActive &&
                <div className="w-full flex flex-col gap-4">
                    <div className="text-4xl font-bold">Confirmación de compra</div>
                    <div className="flex flex-row gap-10">
                        <div className="w-full flex flex-col gap-2">
                            <div className="text-3xl  font-bold">Información del Cliente</div>
                            <div className="w-full flex flex-col gap-1">
                                <form onSubmit={(e) => handleAddClients(e)} className="flex flex-col gap-1">
                                    <label className="text-xl font-medium">
                                        Nombre <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        disabled={stateFormClients}
                                        type="text" 
                                        className={`${stateFormClients ? 'cursor-not-allowed' : ''} p-2 pl-3 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none focus:border-[#7F88D5]`} 
                                        value={newClients.nombre} 
                                        onChange={(e)=>setNewClients({...newClients, nombre: e.target.value})}
                                        required
                                    />
                                    <label className="text-xl font-medium">
                                        Contacto <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        disabled={stateFormClients}
                                        type="number" 
                                        className={`${stateFormClients ? 'cursor-not-allowed' : ''} p-2 pl-3 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none focus:border-[#7F88D5]`} 
                                        value={newClients.contacto} 
                                        onChange={(e)=>setNewClients({...newClients, contacto: e.target.value})}
                                        required
                                    />
                                    <label className="text-xl font-medium">
                                        Dirección <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        disabled={stateFormClients}
                                        type="text" 
                                        className={`${stateFormClients ? 'cursor-not-allowed' : ''} p-2 pl-3 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none focus:border-[#7F88D5]`} 
                                        value={newClients.direccion} 
                                        onChange={(e)=>setNewClients({...newClients, direccion: e.target.value})}
                                        required
                                    />
                                    <label className="text-xl font-medium">
                                        Teléfono <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        disabled={stateFormClients}
                                        type="number" 
                                        className={`${stateFormClients ? 'cursor-not-allowed' : ''} p-2 pl-3 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none focus:border-[#7F88D5]`} 
                                        value={newClients.telefono} 
                                        onChange={(e)=>setNewClients({...newClients, telefono: e.target.value})}
                                        required
                                    />
                                    <label className="text-xl font-medium">
                                        Correo <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        disabled={stateFormClients}
                                        type="email" 
                                        className={`${stateFormClients ? 'cursor-not-allowed' : ''} p-2 pl-3 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none focus:border-[#7F88D5]`} 
                                        value={newClients.correo} 
                                        onChange={(e)=>setNewClients({...newClients, correo: e.target.value})}
                                        required
                                    />
                                    <button 
                                        disabled={stateFormClients}
                                        type="submit" 
                                        className={`${stateFormClients ? 'cursor-not-allowed' : 'cursor-pointer'} bg-[#7F88D5] text-white px-5 text-2xl py-3 font-semibold rounded-lg hover:bg-[#939efa] hover:text-black mt-2`}
                                    >
                                        Crear cliente
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <div className="text-3xl  font-bold">Productos</div>
                            <div className="w-full h-[190px]  flex flex-col rounded-lg shadow-md shadow-slate-300">
                                <div className="w-full h-[80px] relative bg-[#818cf1] rounded-t-lg flex flex-col px-4 justify-center items-start">
                                    <div className="text-3xl font-medium text-white">{productSale.nombre}</div>
                                    <div className="text-md text-white">{productSale.fecha_venta}</div>
                                    <MdDelete onClick={() => setProductSale({})} className="absolute right-3 top-3 text-4xl text-white cursor-pointer hover:text-slate-300"/>
                                </div>
                                <div className="w-full h-[110px] bg-slate-100 rounded-b-lg flex py-4 flex-col px-4 justify-between">
                                    <div className="flex flex-row gap-2 items-center justify-between">
                                        <div className="text-2xl font-medium text-black">ID: {productSale.producto_id}</div>
                                            <div className="px-2 py-1 bg-[#939df7] rounded-xl shadow-md shadow-slate-300 font-medium text-md text-white">{productSale.categoria}</div>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center justify-between">
                                        <div className="text-lg font-medium text-black">Cantidad: {productSale.cantidad}</div>
                                        <div className="text-2xl font-medium text-black">$ {productSale.precio}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-row justify-between mt-4 items-center">
                                <div className="w-full flex flex-col gap-2">
                                    <div className="text-xl font-medium">Total a pagar con IVA</div>
                                    <div className="text-3xl font-bold">$ {productSale?.total}</div>
                                </div>
                                <button disabled={!stateFormClients} onClick={(e)=>handleAddSale(e)} type="submit"  className="bg-[#7F88D5] text-white px-5 text-2xl py-3 font-semibold rounded-lg hover:bg-[#939efa] hover:text-black cursor-pointer">
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Sales;