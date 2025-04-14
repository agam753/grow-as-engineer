"use client";
import { Input } from "./ui/input";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

const data: Array<string> = ["abc", "abd", "def", "ghi", "abc", "abc", "abc"];

const NavSearchBar = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchStr, setSearchStr] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Array<string>>(data);
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newData = data.filter((item) => item.includes(value));
    setSearchStr(value);
    setSearchResult(newData);
  };
  return (
    <div className="relative w-3/4 md:w-full">
      <Input
        type="text"
        value={searchStr}
        placeholder="Search specific jobs..."
        onChange={inputChangeHandler}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full"
      />

      {isFocused && searchStr !== "" && (
        <ul className="border rounded-lg w-full mt-4 absolute bg-background">
          {searchResult.length > 0 ? (
            <ScrollArea className="max-h-72 overflow-y-auto rounded-lg">
              {searchResult.map((res, index) => (
                <li
                  className="border p-2 hover:cursor-pointer hover:bg-accent"
                  key={index}
                >
                  {res}
                </li>
              ))}
            </ScrollArea>
          ) : (
            <li className="border p-2 hover:cursor-pointer hover:bg-accent">
              No Option
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default NavSearchBar;
