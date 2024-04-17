"use client";
import Table from "@/components/Table";
import styles from "./complaint.module.scss";
import { Trow } from "@/interfaces/props.interface";
import { sliceText } from "@/utils/slicetext.util";
import { IoEyeSharp } from "react-icons/io5";
import { TiCancelOutline } from "react-icons/ti";
import { tableInfo } from "@/data/table.data";
import { useState } from "react";

export default function Complaints() {
  const [currentPage, setCurrentPage] = useState(1);
  const theadData = tableInfo.head;
  const tbodyData = tableInfo.body;
  const perPage = 10;

  const handleOnViewClick = (rowIdx: number) => {
    console.log(rowIdx);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const tableData = (
    row: Trow[],
    data: Trow,
    colIdx: number,
    rowIdx: number
  ) => {
    const lstIdx = row.length - 1;
    return (
      <td key={colIdx}>
        {colIdx === lstIdx ? (
          <span className={styles.btnAction}>
            <IoEyeSharp onClick={() => handleOnViewClick(rowIdx)} />
          </span>
        ) : colIdx === 4 ? (
          row[colIdx] && (
            <span className={styles.checkIcon}>
              <TiCancelOutline size={15} />
            </span>
          )
        ) : colIdx === 1 ? (
          data.toString().substring(0, 5)
        ) : colIdx === 3 ? (
          <>{sliceText(data as string, 15)}</>
        ) : (
          data
        )}
      </td>
    );
  };

  return (
    <div className={styles.container}>
      <Table
        title="BlackListed Items"
        isCustomTr={false}
        tableDataElem={(row, data, colIdx, rowIdx) =>
          tableData(row, data, colIdx, rowIdx)
        }
        theadData={theadData}
        tbodyData={tbodyData}
        totalResults={tbodyData.length || 0}
        resultsPerPage={perPage}
        maxVisiblePages={5}
        handlePageChange={handlePageChange}
        emptyText="No complaint Made Yet"
        xtraStyle={styles.table}
      />
    </div>
  );
}
