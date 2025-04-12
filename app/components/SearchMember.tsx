"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useScreenSize } from "../hooks/useScreenSize";

interface IUser {
  _id: string;
  userName: string;
}

const SearchMember = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IUser[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const screen = useScreenSize();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(`/api/member/search?username=${query}`);
        const data = await res.json();
        setResults(data?.members || []);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const delayDebounce = setTimeout(fetchUsers, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (username: string) => {
    setQuery("");
    setShowDropdown(false);
    router.push(`/member/${username}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setShowDropdown(false);

      // Hide input on mobile when clicked outside
      if (isInputVisible) {
        setIsInputVisible(false);
        setQuery("");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isInputVisible]);

  return (
    <div ref={containerRef} className="w-full max-w-md flex items-center justify-center h-full">
      {/* Search icon for mobile */}
      {screen === "mobile" && !isInputVisible ? (
        <button
          onClick={() => setIsInputVisible(true)}
          className="text-white p-2 mx-auto"
        >
          <FaSearch />
        </button>
      ) : (
        (screen !== "mobile" || isInputVisible) && (
          <div className={`flex items-center w-full ${screen === "mobile" ? "absolute left-0 bg-primary-button z-40 h-full px-4" : "relative"}`}>
            <input
              type="text"
              placeholder="Search username..."
              className="w-full px-4 py-2 !border !border-gray-400 !border-solid rounded-md shadow-sm focus:outline-none focus:ring focus:!border-primary-button text-white bg-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setShowDropdown(true)}
            />
            <button
              onClick={() => {
                setIsInputVisible(false);
                setQuery("");
                setShowDropdown(false);
              }}
              className="ml-2 text-white"
            >
              <FaTimes />
            </button>




               {/* Dropdown for search results */}
      {showDropdown && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto top-full left-0">
          {results.map((member) => (
            <li
              key={member._id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:!bg-gray-500 dark:text-white cursor-pointer"
              onClick={() => handleSelect(member.userName)}
            >
              {member.userName}
            </li>
          ))}
        </ul>
      )}
          </div>
        )
      )}

   
    </div>
  );
};

export default SearchMember;
