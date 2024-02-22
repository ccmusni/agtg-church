"use client";

import { useState, useEffect } from "react";

import { NAV_ITEMS } from "@app/constants";

import MobileMenu from "./mobile-menu";
import MenuItem from "../menu-item";
import MenuItemWithSubMenu from "../menu-item-with-sub-menu";

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "bg-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <nav className="border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <div
                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar"
              >
                <div className="relative mt-3 md:hidden">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                </div>
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  {NAV_ITEMS.map((item, idx) => {
                    return item.submenu ? (
                      <MenuItemWithSubMenu
                        key={idx}
                        title={item.title}
                        items={item.subMenuItems}
                      />
                    ) : (
                      <MenuItem key={idx} item={item} />
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
