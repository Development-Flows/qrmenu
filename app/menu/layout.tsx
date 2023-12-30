import Footer from "@/components/pages/menu/Footer";
import React from "react";
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import("../../components/pages/menu/Header").then(module => module.default));

export default function MenuLayout  ({children}: { children:React.ReactNode}){
   return <div style={{display:"flex" ,flexDirection:"column",minHeight:"100vh"}}>
      <h1 style={{textAlign:'center',fontWeight:900,padding:'10px 0px'}}>Sedir Kafe</h1>
      <main style={{flexGrow:1}}>{children}</main>
    <Footer />
    </div>
}