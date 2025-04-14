"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import NavSearchBar from "./NavSearchBar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";

const NavigationBar = () => {
  const navIconCss = "text-center w-full md:w-auto md:font-semibold";
  const [showSearch, setShowSearch] = useState<boolean>(false);
  return (
    <nav className="navigationBar flex justify-between align-middle p-4 gap-2 border-b backdrop-blur-lg sticky top-0 z-20 bg-opacity-70">
      {showSearch ? (
        <NavSearchBar />
      ) : (
        <Button variant={"ghost"} className="md:text-lg font-bold px-2 md:px-4">
          <Link href={"/"}>Grow As Engineer</Link>
        </Button>
      )}
      <div className="flex items-center gap-4 md:hidden">
        {showSearch ? (
          <XIcon
            className="cursor-pointer"
            onClick={() => setShowSearch(false)}
          />
        ) : (
          <SearchIcon
            className="cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <Link href="/remote-jobs">
              <DropdownMenuItem>
                <Button className={navIconCss} variant={"ghost"}>
                  Remote Jobs
                </Button>
              </DropdownMenuItem>
            </Link> */}
            <Link href="/contact">
              <DropdownMenuItem asChild>
                <Button className={navIconCss} variant={"ghost"}>
                  Contact Us
                </Button>
              </DropdownMenuItem>
            </Link>
            <Link href="/about">
              <DropdownMenuItem>
                <Button className={navIconCss} variant={"ghost"}>
                  About
                </Button>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <ThemeToggle />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block w-2/4">
        <NavSearchBar />
      </div>
      <ul className="hidden md:flex">
        {/* <li>
          <Button className={navIconCss} asChild variant={"ghost"}>
            <Link href="/remote-jobs">Remote Jobs</Link>
          </Button>
        </li> */}
        <li>
          <Button className={navIconCss} asChild variant={"ghost"}>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </li>
        <li>
          <Button className={navIconCss} asChild variant={"ghost"}>
            <Link href="/about">About</Link>
          </Button>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
