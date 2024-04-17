import { TableProps } from "../../interfaces/props.interface";
import { PropagateLoader } from "react-spinners";
import styles from "./styles.module.scss";
import Pagination from "../Pagination";

export default function Table({
  title,
  theadData,
  tbodyData,
  xtraStyle,
  isCustomTr = true,
  tableDataElem,
  handlePageChange,
  totalResults,
  resultsPerPage,
  emptyText,
  showLoader = false,
  isError = false,
  errMsg,
}: TableProps) {
  return (
    <div className={`${styles.table} ${xtraStyle}`}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
      </div>

      {showLoader ? (
        <div className={styles.loader}>
          <PropagateLoader color="#3E4095" size={10} />
        </div>
      ) : isError ? (
        <h2 className={styles.errTxt}>{errMsg}</h2>
      ) : tbodyData.length === 0 ? (
        <h2 className={styles.empty_text}>{emptyText}</h2>
      ) : (
        <table>
          <thead>
            <tr>
              {theadData.map((data, idx) => (
                <th key={idx} scope="col">
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbodyData.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((data, colIdx) =>
                  isCustomTr ? (
                    <td key={colIdx}>{data}</td>
                  ) : (
                    tableDataElem && tableDataElem(row, data, colIdx, rowIdx)
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {totalResults > 0 && (
        <Pagination
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
        />
      )}
    </div>
  );
}
