import React from "react";

interface NavbarItemProps {
  label: string; // The label of the navbar item
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label} {/* Render the label as the content of the navbar item */}
    </div>
  );
};

export default NavbarItem;
