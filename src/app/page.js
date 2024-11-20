"use client";

import { Sidebar } from "./components/Sidebar/Sidebar";
import { Main } from "./components/Main/Main";
import { useState } from "react";
export default function Home() {

const [isOpen, setIsOpen] = useState(0);

  return (
    <div >
        {/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        {/* <Main isOpen={isOpen} /> */}
      </div>
  );
}
