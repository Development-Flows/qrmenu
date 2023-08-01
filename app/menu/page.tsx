"use client"
import React from "react";
import { NextPage } from "next";
import { categories, products } from "./helpers";
import styles from "./menu.module.scss";
import CategoryArea from "./CategoryArea";

const Menu: NextPage = () => {
let prop = "init"
  const setActiveCategoryHandler = (param) => {
prop=param
    return param;
  };
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        <h1>Ürünler</h1>
        {products.map((pItem, pIndex) => {
          return (
            <div
              onClick={()=>setActiveCategoryHandler(pItem.name)}
              key={pIndex}
              className={styles.product}
            >
              <div className={styles.productName}>{pItem.name}</div>
            </div>
          );
        })}
      </div>
      <CategoryArea
      prop={prop}
        setActiveCategoryHandler={setActiveCategoryHandler}
      ></CategoryArea>
      <div className={styles.categories}>
        <h1>Kategoriler</h1>
        {categories.map((cItem, cIndex) => {
          return (
            <div key={cIndex} className={styles.category}>
              <div className={styles.categoryName}>{cItem.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
