'use client'

import { useRouter } from "next/navigation";
import { FaUsers, FaBoxOpen } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
export const Sidebar = () => {
    const router = useRouter();
    return (
        <div className=" h-full w-20 flex flex-col  bg-[#7F88D5]">
            <div 
            onClick={() => {router.push('/products');}}
            title="Productos"
                className=" h-16 w-full cursor-pointer border-b-[1px] justify-center items-center flex border-[#929dff] bg-[#7F88D5] hover:bg-[#929dff] ">
                <IoBagHandle className="text-4xl text-white"/>
            </div>
            <div 
                onClick={() => {router.push('/clients');}}
                title="Clientes"
                className=" h-16 w-full cursor-pointer border-b-[1px] justify-center items-center flex border-[#929dff] bg-[#7F88D5] hover:bg-[#929dff] ">
                <FaUsers className="text-4xl text-white"/>
            </div>
            <div 
                onClick={() => {router.push('/inventory');}}
                title="Inventario"
                className=" h-16 w-full cursor-pointer border-b-[1px] justify-center items-center flex border-[#929dff] bg-[#7F88D5] hover:bg-[#929dff] ">
                <FaBoxOpen className="text-4xl text-white"/>
            </div>
            <div 
                onClick={() => {router.push('/sales');}}
                title="Ventas"
                className=" h-16 w-full cursor-pointer border-b-[1px] justify-center items-center flex border-[#929dff] bg-[#7F88D5] hover:bg-[#929dff] ">
                <MdShoppingCart className="text-4xl text-white"/>
            </div>
            <div 
                onClick={() => {router.push('/reports');}}
                title="Reportes"
                className=" h-16 w-full cursor-pointer border-b-[1px] justify-center items-center flex border-[#929dff] bg-[#7F88D5] hover:bg-[#929dff] ">
                <MdBarChart className="text-4xl text-white"/>
            </div>
        </div>
    );
};

