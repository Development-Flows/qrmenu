"use client";
import { TTable } from "@/lib/helpers";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getTableInfos } from "@/redux/tableLinkSlice";
import { NextPage } from "next";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import styles from "./table.module.scss";
import cn from "classnames";

const Tables: NextPage = () => {
  const tables = useAppSelector((state) => state.table.linkList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTableInfos(30));
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>Firmaya Ait Masalar</div>
      <div className={styles.container}>
        {tables.map((item: TTable, index) => (
          <div
            className={cn(styles.tableWrapper, {
              [styles.isActiveTrue]: item.isActive,
              [styles.isActiveFalse]: !item.isActive,
            })}
            key={index}
          >
            <h2 className={styles.tableName}>{item.name}</h2>
            <h4 className={styles.tableDesc}>{item.desc}</h4>

            <QRCode
              size={256}
              className={styles.qrCode}
              value={item.link}
              viewBox={`0 0 256 256`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;
