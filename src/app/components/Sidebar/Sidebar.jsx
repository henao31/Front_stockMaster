'use client'

import { useRouter } from "next/navigation";
import { FaUsers, FaBoxOpen } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";

export const Sidebar = () => {
    const router = useRouter();
    return (
        <div className=" h-full w-20 flex flex-col  bg-[#128f8e]">
            <div 
            onClick={() => {router.push('/products');}}
            title="Productos"
            className=" h-16 w-full cursor-pointer border-b-[1px] justify-center items-center flex border-[#127373] bg-[#128f8e] hover:bg-[#1ab2ae] ">
                <IoBagHandle className="text-4xl text-white"/>
            </div>
            <div 
                onClick={() => {router.push('/clients');}}
                title="Clientes"
                className=" h-16 w-full cursor-pointer border-b-[1px] justify-center items-center flex border-[#127373] bg-[#128f8e] hover:bg-[#1ab2ae] ">
                <FaUsers className="text-4xl text-white"/>
            </div>
            <div 
                onClick={() => {router.push('/inventory');}}
                title="Inventario"
                className=" h-16 w-full cursor-pointer border-b-[1px] justify-center items-center flex border-[#127373] bg-[#128f8e] hover:bg-[#1ab2ae] ">
                <FaBoxOpen className="text-4xl text-white"/>
            </div>
            <div 
                onClick={() => {router.push('/sales');}}
                title="Ventas"
                className=" h-16 w-full cursor-pointer border-b-[1px] justify-center items-center flex border-[#127373] bg-[#128f8e] hover:bg-[#1ab2ae] ">
                <MdShoppingCart className="text-4xl text-white"/>
            </div>
        </div>
    );
};

