import ComplaintLayout from "@/components/ComplaintLayout";
import { getFacultDepart } from "@/data/user/getFacultDept";
import { ReportForm } from "@/components/ReportForm";
import { featureData } from "@/data/localData/components.data";
import styles from "./report.module.scss";
import { Fragment } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report",
};

export default async function ReportPage() {
  const departments = await getFacultDepart({ role: "HOD" });
  const faculties = await getFacultDepart({ role: "Dean" });
  const studAffair = await getFacultDepart({ role: "Student_Affairs" });

  return (
    <ComplaintLayout>
      <div className={styles.container}>
        <div className={styles.features}>
          <div className={styles.top}>
            <p className={styles.title}>Complaint Management System</p>
            <h1>Submit Your Complaint</h1>
            <p className={styles.subtitle}>
              Complaint Management System ensures swift and confidential
              resolution of student concerns. It guarantee a quick response to
              submitted complaints, ensuring the wellfare of the students are
              put into consideration.
            </p>
          </div>
          <div className={styles.below}>
            {featureData.map(({ Icon, title, subtitle }, idx) => (
              <Fragment key={idx}>
                <span>
                  <Icon />
                </span>
                <div>
                  <h2>{title}</h2>
                  <p>{subtitle}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className={styles.form}>
          <ReportForm
            department={departments?.data}
            faculty={faculties?.data}
            studAffair={studAffair?.data}
          />
        </div>
      </div>
    </ComplaintLayout>
  );
}
