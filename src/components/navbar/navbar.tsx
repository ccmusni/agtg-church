"use client";

import { useState, useEffect } from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar as FlowbiteNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";

import supabase from "@/utils/supabase";
import { NAV_ITEMS } from "@app/constants";
import { useAppDispatch, useAppSelector } from "@/store";
import { setUserState } from "@/store/userSlice";

import NavbarItem from "./navbar-item";
import NavbarDropdown from "./navbar-dropdown";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.authState);
  const userState = useAppSelector((state) => state.user.userState);
  const [top, setTop] = useState<boolean>(true);

  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      dispatch(setUserState(user));
    }

    if (authState) {
      getUser();
    }
  }, []);

  const isShow = (forAdmin: boolean): boolean => {
    return (forAdmin && authState) || !forAdmin;
  };

  return (
    <FlowbiteNavbar
      fluid
      rounded
      className={`fixed w-full z-30 bg-white bg-opacity-95 p-8 ${
        !top ? "transition duration-300 shadow-lg" : ""
      }`}
    >
      <div className="flex md:order-2 self-start">
        <NavbarToggle />
      </div>

      <div className="flex md:items-center justify-between max-w-6xl md:mx-auto px-2 sm:px-6 w-auto md:w-full flex-col md:flex-row">
        <NavbarBrand as={Link} href="/">
          <img
            src="/images/agtg.jpg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            All Glory to God Church
          </span>
        </NavbarBrand>
        <NavbarCollapse>
          {NAV_ITEMS.map((item, idx) => {
            return item.hasSubMenu
              ? isShow(item.forAdmin) && (
                  <div key={idx} className="text-sm md:text-lg p-3 md:p-0">
                    <NavbarDropdown
                      label={item.label}
                      items={item.subMenuItems}
                    />
                  </div>
                )
              : isShow(item.forAdmin) && (
                  <div key={idx} className="text-sm md:text-lg">
                    <NavbarItem item={item} />{" "}
                  </div>
                );
          })}
        </NavbarCollapse>

        {authState && userState ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="/images/default-profile-pic.png"
                rounded
              />
            }
            placement="bottom"
          >
            <DropdownHeader>
              <span className="block text-sm">{userState?.["name"]}</span>
              <span className="block truncate text-sm font-medium">
                {userState?.email}
              </span>
            </DropdownHeader>
            <DropdownItem href="/content-editor">Content Editor</DropdownItem>
            <DropdownItem href="#">Settings</DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/signout">Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link
            className="text-sm md:text-lg p-3 md:p-0 hover:text-cyan-700 font-medium"
            href="/signin"
          >
            {/* TODO: make it in a modal */}
            Sign in
          </Link>
        )}
      </div>
    </FlowbiteNavbar>
  );
}
