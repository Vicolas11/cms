"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { logoutUserAction } from "@/services/auth/authActions";
import { NavProps } from "@/interfaces/props.interface";
import { AnimatePresence, motion } from "framer-motion";
import { navbarAnimate } from "@/data/localData/animation.data";
import { Suspense, useEffect, useState } from "react";
import { shrinkTxt } from "@/utils/shrink.utils";
import { bubbleText } from "@/utils/bubble.util";
import { FaUserCircle } from "react-icons/fa";
import { verifyToken } from "@/utils/jwt.util";
import { IoMdLogOut } from "react-icons/io";
import styles from "./navbar.module.scss";
import { MdClose } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

export const Navbar = ({ token, bubble, data, isHome = false }: NavProps) => {
  const [width, setWidth] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const isAuth = verifyToken(token);
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
    route.replace(`${pathname}${!showLogout && isAuth ? "?logout=true" : ""}`, {
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
        <h4>
          {data?.name ? shrinkTxt(`${data.name.split(" ")[0]}`, width) : ""}
        </h4>
        <p>
          {data?.role === "Student_Affairs"
            ? "Student Affairs"
            : data?.role || "user"}
        </p>
      </div>
      <div className={styles.avatar}>
        {data?.avatar ? (
          <Image
            src={data.avatar}
            alt="avatar"
            height={35}
            width={35}
            className={styles.avatarImg}
          />
        ) : (
          <FaUserCircle size={30} />
        )}
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

  const handleLogout = async () => {
    await logoutUserAction();
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <>
      <Suspense>
        <nav className={isHome ? styles.homeNavbar : styles.navbar}>
          <div className={styles.container}>
            <Link href="/">
              <div className={styles.navLogo}>
                <Image
                  src={isHome ? "/logo_white.png" : "/logo.png"}
                  alt="Logo"
                  fill
                />
              </div>
            </Link>

            {/* Show on desktop Screen */}
            <ul className={styles.navLink}>
              {linksArr.map(({ pathname: pth, title, show }, idx) => {
                const lstIdx = linksArr.length - 1;
                return (
                  <li
                    key={idx}
                    className={`${
                      idx !== lstIdx
                        ? pathname === pth
                          ? styles.active
                          : ""
                        : ""
                    } ${idx === lstIdx && !isAuth ? styles.lastLi : ""}`}
                  >
                    {idx === lstIdx && isAuth
                      ? profileContainer("desktop")
                      : show && (
                          <Link href={pth} prefetch={false}>
                            {title === "Complaints" ? (
                              <span className={styles.complaints}>
                                {title}
                                {(bubble as number) > 0 && (
                                  <span className={styles.bubble}>
                                    {bubbleText(`${bubble}`)}
                                  </span>
                                )}
                              </span>
                            ) : (
                              title
                            )}
                          </Link>
                        )}
                  </li>
                );
              })}

              {/* Desktop Logout Button */}
              {showLogout && (
                <div className={styles.logout} onClick={handleLogout}>
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
                    ({ show, title, pathname: pth }, idx) =>
                      show && (
                        <li
                          key={idx}
                          className={pathname === pth ? styles.active : ""}
                        >
                          {idx === 3 ? (
                            // Logout Button Mobile
                            <span onClick={handleLogout}>{title}</span>
                          ) : (
                            <Link href={pth} prefetch={false}>
                              {title === "Complaints" ? (
                                <span className={styles.complaints}>
                                  {title}{" "}
                                  {(bubble as number) > 0 && (
                                    <span className={styles.bubble}>
                                      {bubbleText(`${bubble}`)}
                                    </span>
                                  )}
                                </span>
                              ) : (
                                title
                              )}
                            </Link>
                          )}
                        </li>
                      )
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </Suspense>
    </>
  );
};
