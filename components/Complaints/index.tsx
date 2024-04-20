"use client";
import Table from "@/components/Table";
import styles from "./complaint.module.scss";
import { dataType } from "@/interfaces/props.interface";
import { sliceText } from "@/utils/slicetext.util";
import { IoEyeSharp } from "react-icons/io5";
import { tableInfo } from "@/data/table.data";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Complaints() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const theadData = tableInfo.head;
  const tbodyData = tableInfo.body.map((data, i) => ({
    index: i + 1,
    ...data,
    action: "",
  }));
  const perPage = 10;

  const handleOnViewClick = (id: dataType) => {
    console.log(id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getUniqIdCallback = (id: dataType) => {
    router.push(`${pathname}/${id}`);
  };

  const tableData = (
    id: dataType,
    row: dataType[],
    data: dataType,
    colIdx: number,
    _: number
  ) => {
    const lstIdx = row.length - 1;
    return (
      <td key={colIdx}>
        {colIdx === lstIdx ? (
          <span className={styles.btnAction}>
            <Link href={`complaints/${id}`}>
              <IoEyeSharp size={20} onClick={() => handleOnViewClick(id)} />
            </Link>
          </span>
        ) : colIdx === 4 ? (
          data ? (
            <span className={styles.replied}>Replied</span>
          ) : (
            <span className={styles.pending}>Pending</span>
          )
        ) : colIdx === 1 ? (
          <>{sliceText(data as string, 15)}</>
        ) : colIdx === 2 ? (
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
        title="Complaints"
        keysToRemove={["id", "isRead", "response"]}
        isCustomTr={false}
        tableDataElem={(id, row, data, colIdx, rowIdx) =>
          tableData(id, row, data, colIdx, rowIdx)
        }
        theadData={theadData}
        tbodyData={tbodyData}
        totalResults={tbodyData.length || 0}
        resultsPerPage={perPage}
        maxVisiblePages={5}
        getUniqIdCallback={getUniqIdCallback}
        handlePageChange={handlePageChange}
        emptyText="No complaint Made Yet"
        xtraStyle={styles.table}
      />
    </div>
  );
}
