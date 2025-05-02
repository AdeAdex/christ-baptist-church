// app/data/sidebarLinks.ts

import {
  FiGrid,
  FiSettings,
  FiBookOpen,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiGift,
  FiBell,
  FiMail,
  FiBarChart2,
  FiVideo,
} from "react-icons/fi";

export const sidebarLinks = [
  { name: "Dashboard", path: "home", icon: FiGrid, adminOnly: false },
  { name: "Settings", path: "settings", icon: FiSettings, adminOnly: false },
  {
    name: "Ministries",
    path: "ministries",
    icon: FiBookOpen,
    adminOnly: true,
  },
  {
    name: "Ministry Activities",
    path: "ministries-activities",
    icon: FiCalendar,
    // adminOnly: true,
  },
  {
    name: "Manage Members",
    path: "members-directory",
    icon: FiUsers,
    adminOnly: true,
  },
  { name: "Events", path: "events", icon: FiCalendar, adminOnly: false },
  {
    name: "Contributions",
    path: "contributions",
    icon: FiDollarSign,
    // adminOnly: true,
  },
  {
    name: "Live Video",
    path: "live-video",
    icon: FiVideo, // Import from react-icons/fi
    adminOnly: false,
  },

  { name: "Donations", path: "donations", icon: FiGift, adminOnly: false },
  {
    name: "Announcements",
    path: "announcements",
    icon: FiBell,
    adminOnly: false,
  },
  {
    name: "Broadcast Email",
    path: "send-broadcast",
    icon: FiMail,
    adminOnly: true,
  },
  { name: "Members", path: "members", icon: FiUsers, adminOnly: true },
  { name: "Reports", path: "reports", icon: FiBarChart2, adminOnly: true },
];
