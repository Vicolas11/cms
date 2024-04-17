"use client";
import styles from "./navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/app/store/store";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { shrinkTxt } from "@/utils/shrink.utils";
import { navbarAnimate } from "@/data/animation.data";

const width = window.innerWidth;

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuth } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const showLogout = searchParams.get("logout");
  const pathname = usePathname();
  const route = useRouter();

  const linksArr = isAuth
    ? [
        { pathname: "/report", title: "Report", show: true },
        { pathname: "/complaints", title: "Complaints", show: true },
        { pathname: "/account", title: "Account", show: true },
        { pathname: "/", title: "Logout", show: true },
      ]
    : [
        { pathname: "/register", title: "Register", show: true },
        { pathname: "/login", title: "Login", show: true },
      ];

  const onProfileClick = () => {
    route.replace(`${pathname}${!showLogout ? "?logout=true" : ""}`, {
      scroll: false,
    });
  };

  const profileContainer = (style: string) => (
    <div
      className={styles[style]}
      onClick={() =>
        style === "desktop" ? onProfileClick() : setShowMenu(!showMenu)
      }
    >
      <div className={styles.username}>
        <h4>{shrinkTxt("Vicolas", width)}</h4>
        <p>Student</p>
      </div>
      <div className={styles.avatar}>
        <FaUserCircle size={30} />
        {style === "desktop" ? (
          showLogout ? (
            <RiArrowDropUpFill size={30} />
          ) : (
            <RiArrowDropDownFill size={30} />
          )
        ) : showMenu ? (
          <RiArrowDropUpFill size={30} />
        ) : (
          <RiArrowDropDownFill size={30} />
        )}
      </div>
    </div>
  );

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link href="/">
            <div className={styles.navLogo}>
              <Image src="/logo.png" alt="Logo" fill />
            </div>
          </Link>

          {/* Show on desktop Screen */}
          <ul className={styles.navLink}>
            {linksArr.map((lnk, idx) => {
              const lstIdx = linksArr.length - 1;
              return (
                <li
                  key={idx}
                  className={`${
                    idx !== lstIdx
                      ? pathname === lnk.pathname
                        ? styles.active
                        : ""
                      : ""
                  } ${idx === lstIdx && !isAuth ? styles.lastLi : ""}`}
                >
                  {idx === lstIdx && isAuth
                    ? profileContainer("desktop")
                    : lnk.show && (
                        <Link href={lnk.pathname} prefetch={false}>
                          {lnk.title}
                        </Link>
                      )}
                </li>
              );
            })}

            {/* Desktop Logout Button */}
            {showLogout && (
              <div className={styles.logout}>
                <IoMdLogOut size={20} /> Logout
              </div>
            )}
          </ul>

          {/* Show Menu on Mobile Screen */}
          {isAuth ? (
            profileContainer("mobile")
          ) : (
            <span
              className={styles.btnMenu}
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? <MdClose size={30} /> : <IoMenu size={30} />}
            </span>
          )}
          <AnimatePresence mode="wait">
            {showMenu && (
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={navbarAnimate}
                className={styles.mobileNavLink}
              >
                {linksArr.map(
                  ({ show, title }, idx) => show && <li key={idx}>{title}</li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};
