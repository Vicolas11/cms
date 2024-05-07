"use client";
import { QueryParams, dataType } from "@/interfaces/props.interface";
import { usePathname, useRouter } from "next/navigation";
import { tableInfo } from "@/data/localData/table.data";
import { Suspense, useEffect, useState } from "react";
import { formatDate } from "@/utils/formatdate.util";
import { sliceText } from "@/utils/slicetext.util";
import { MdOutlineEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import styles from "./complaint.module.scss";
import { BiTrash } from "react-icons/bi";
import CustomTable from "../CustomTable";
import ShowLoader from "../ShowLoader";
import Link from "next/link";

export default function Complaints({
  currentPg,
  perPage,
  complaints,
  userId,
}: QueryParams) {
  const [currentPage, setCurrentPage] = useState(currentPg);
  const { replace, push } = useRouter();
  const pathname = usePathname();
  const theadData = tableInfo.head;

  const tbodyData = complaints
    ? complaints.data.map((itm, i) => ({
        id: itm.id,
        hasOpened: itm.hasOpened,
        complainerUserId: itm.complainerUserId,
        index: i + 1,
        subject: itm.subject,
        complaint: itm.body,
        reportedTo: `${
          itm.reportedTo.role === "Student_Affairs"
            ? "Student Affairs"
            : itm.reportedTo.role
        }`,
        replied: itm.hasReplied,
        date: formatDate(itm.createdAt),
        action: "",
      }))
    : [];

  const handleOnViewClick = (id: dataType) => {
    console.log(id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOnEditClick = (id: dataType) => {
    push(`${pathname}/update/${id}`, { scroll: false });
  };

  const handleOnDeleteClick = (id: dataType) => {
    push(`${pathname}/delete/${id}`, { scroll: false });
  };

  const tableData = (
    id: dataType,
    row: dataType[],
    data: dataType,
    colIdx: number,
    _: number,
    complainerUserId: string
  ) => {
    const lstIdx = row.length - 1;
    return (
      <td key={colIdx}>
        {colIdx === lstIdx ? (
          <span className={styles.btnAction}>
            <Link href={`${pathname}/${id}`} scroll={false}>
              <IoEyeSharp
                size={20}
                className={styles.btnView}
                onClick={() => handleOnViewClick(id)}
              />
            </Link>
            {!row[4] && complainerUserId === userId && (
              <MdOutlineEdit
                className={styles.btnEdit}
                onClick={() => handleOnEditClick(id)}
              />
            )}
            {row[4] && complainerUserId === userId && (
              <BiTrash
                className={styles.btnDelete}
                onClick={() => handleOnDeleteClick(id)}
              />
            )}
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

  useEffect(() => {
    replace(`${pathname}?page=${currentPage}`);
  }, [currentPage, pathname, perPage, replace]);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.header}>
          <h4 className={styles.title}>Complaints</h4>
        </div>
        <Suspense fallback={<ShowLoader />}>
          <CustomTable
            isCustomTr={false}
            keysToRemove={["id", "hasOpened", "complainerUserId"]}
            tableDataElem={(
              id,
              row,
              data,
              colIdx,
              rowIndex,
              complainerUserId
            ) => tableData(id, row, data, colIdx, rowIndex, complainerUserId)}
            theadData={theadData}
            tbodyData={tbodyData}
            totalResults={complaints?.totalCount || 0}
            resultsPerPage={perPage}
            maxVisiblePages={5}
            handlePageChange={handlePageChange}
            emptyText="No Complaints made yet"
            isError={complaints?.error}
            errMsg={"An error occurred"}
          />
        </Suspense>
      </div>
    </>
  );
}
