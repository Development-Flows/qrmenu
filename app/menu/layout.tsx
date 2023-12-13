import Footer from "@/components/pages/menu/Footer";
import React from "react";
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(
    () => import('/components/pages/menu/Header'),
    { ssr: false }
)
export default function MenuLayout  ({children}: { children:React.ReactNode}){
   return <div style={{display:"flex" ,flexDirection:"column",minHeight:"100vh"}}>
    <DynamicHeader  logoSrc={"/vercel.svg"} logoAltText={"Vercel"} />
       <main style={{flexGrow:1}}>{children}</main>

    <Footer />
    </div>
}