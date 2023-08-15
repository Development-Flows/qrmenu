import Footer from "@/components/pages/menu/Footer";
import Header from "@/components/pages/menu/Header";
import React from "react";
import styles from "@/app/menu/menu.module.scss";

export default function MenuLayout  ({children}: { children:React.ReactNode}){
   return <div style={{display:"flex" ,flexDirection:"column",minHeight:"100vh"}}>
    <Header  logoSrc={"/vercel.svg"} logoAltText={"Vercel"} />
       <main style={{flexGrow:1}}>{children}</main>

    <Footer />
    </div>
}