import React from "react";

interface NavBarProps {
  logoSrc: string;
  altText?: string;
}

const NavBar: React.FC<NavBarProps> = ({ logoSrc, altText = "Logo" }) => {
  return (
    <div className="bg-brand-navy">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
        <img src={logoSrc} alt={altText} className="h-10 object-contain" />
      </div>
    </div>
  );
};

export default NavBar;
