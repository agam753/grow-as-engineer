"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      className="w-full md:w-fit relative flex items-center justify-center"
      variant="ghost"
      onClick={() => {
        if (theme === "dark") setTheme("light");
        else setTheme("dark");
      }}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
      <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all hidden dark:block" />
      <span className="ml-2 md:font-semibold">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
