"use client";
import React, { useEffect, useState } from "react";
import styles from "./menu.module.scss";
const CategoryArea = () => {



  const [activeCategory, setActiveCategory] = useState<string | null>();
  return (
    <div className={styles.categoryArea}>
      <div>
        {activeCategory && (
          <div>
            <span>{activeCategory}</span>
            <button
              className={styles.xButton}
              onClick={() => setActiveCategory(null)}
            >
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryArea;
