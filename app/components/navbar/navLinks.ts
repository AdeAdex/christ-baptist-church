const navLinks = [
  { label: "Home", path: "/" },
  { 
    label: "Ministries", 
    path: "/ministries", 
    dropdown: [
      { label: "Evangelism", path: "/ministries/evangelism" },
      { label: "Fellowship", path: "/ministries/fellowship" },
      { label: "Discipleship", path: "/ministries/discipleship" },
    ],
  },
  { 
    label: "About Us", 
    path: "/about-us", 
    dropdown: [
      { label: "About Us", path: "/about-us" },
      { label: "Leadership", path: "/about-us/leadership" },
    ],
  },
  { label: "Contact Us", path: "/contact-us" },
];

export default navLinks;
