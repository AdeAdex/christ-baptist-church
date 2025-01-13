// import React, { useState } from "react";
// import Link from "next/link";
// import { FaArrowRight, FaArrowDown } from "react-icons/fa";
// import LogoSection from "./LogoSection";
// import { NavLinkProps } from "@/app/types/navbarLinks";

// interface MobileMenuProps {
//   opened: boolean;
//   toggle: () => void;
//   navLinks: NavLinkProps[];
// }

// const MobileMenu: React.FC<MobileMenuProps> = ({
//   opened,
//   toggle,
//   navLinks,
// }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleDropdownToggle = () => setDropdownOpen((prev) => !prev);

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full h-screen bg-gray-800 text-white flex flex-col p-6 z-50 transform transition-all duration-300 ease-in-out md:hidden ${
//         opened ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
//       }`}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <LogoSection />
//         <button onClick={toggle}>Close</button>
//       </div>

//       {navLinks.map((link) =>
//         link.dropdown ? (
//           <div key={link.path}>
//             <div
//               className="cursor-pointer mb-4 text-lg flex items-center"
//               onClick={handleDropdownToggle}
//             >
//               <span>{link.label}</span>
//               {dropdownOpen ? (
//                 <FaArrowDown className="ml-2 text-white" />
//               ) : (
//                 <FaArrowRight className="ml-2 text-white" />
//               )}
//             </div>
//             {dropdownOpen && (
//               <div className="ml-4 space-y-2 mb-4">
//                 {link.dropdown.map((subLink) => (
//                   <Link
//                     key={subLink.path}
//                     href={subLink.path}
//                     className="block text-sm text-gray-200"
//                     onClick={() => {
//                       toggle();
//                       setDropdownOpen(false);
//                     }}
//                   >
//                     {subLink.label}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : (
//           <Link
//             key={link.path}
//             href={link.path}
//             className="mb-4 text-lg"
//             onClick={toggle}
//           >
//             {link.label}
//           </Link>
//         )
//       )}
//     </div>
//   );
// };

// export default MobileMenu;

import React, { useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import LogoSection from "./LogoSection";
import { NavLinkProps } from "@/app/types/navbarLinks";

interface MobileMenuProps {
  opened: boolean;
  toggle: () => void;
  navLinks: NavLinkProps[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  opened,
  toggle,
  navLinks,
}) => {
  const [dropdownState, setDropdownState] = useState<{
    [key: string]: boolean;
  }>({});

  const handleDropdownToggle = (path: string) => {
    setDropdownState((prev) => ({
      ...prev,
      [path]: !prev[path], // Toggle the dropdown state for the given path
    }));
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-gray-800 text-white flex flex-col p-6 z-50 transform transition-all duration-300 ease-in-out md:hidden ${
        opened ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <LogoSection />
        <button onClick={toggle}>Close</button>
      </div>

      {navLinks.map((link) =>
        link.dropdown ? (
          <div key={link.path}>
            <div
              className="cursor-pointer mb-4 text-lg flex items-center"
              onClick={() => handleDropdownToggle(link.path)}
            >
              <span>{link.label}</span>
              {dropdownState[link.path] ? (
                <FaArrowDown className="ml-2 text-white" />
              ) : (
                <FaArrowRight className="ml-2 text-white" />
              )}
            </div>
            {dropdownState[link.path] && (
              <div className="ml-4 space-y-2 mb-4">
                {link.dropdown.map((subLink) => (
                  <Link
                    key={subLink.path}
                    href={subLink.path}
                    className="block text-sm text-gray-200"
                    onClick={() => {
                      toggle(); // Close the mobile menu
                      setDropdownState((prev) => ({
                        ...prev,
                        [link.path]: false,
                      }));
                    }}
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={link.path}
            href={link.path}
            className="mb-4 text-lg"
            onClick={toggle}
          >
            {link.label}
          </Link>
        )
      )}
    </div>
  );
};

export default MobileMenu;
