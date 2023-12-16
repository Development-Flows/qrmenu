import React from "react";
import { NextPage } from "next";
import { Response_getAllWithProduct } from "@/service/types";
import Content from "@/components/pages/menu/Content";

const Menu: NextPage = async ({}) => {
  const categories: Response_getAllWithProduct["data"] = [];

  await fetch("https://qrmenu-service.onrender.com/menu/getAllWithProduct", {
    next: { revalidate: 60*15 },
  })
    .then(async (res) => await res.json())
    .then((res: Response_getAllWithProduct) => res.data)
    .then((res: Response_getAllWithProduct["data"]) => {
      categories.push(...res);
    })
    .catch((err) => {
      console.log("err", err);
    });

  return (
    <div>
        <Content categories={categories} />
    </div>
  );
};
export default Menu;
