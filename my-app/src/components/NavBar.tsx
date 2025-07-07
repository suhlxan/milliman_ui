import React from "react";

interface NavBarProps {
  logoSrc: string;
  altText?: string;
}

const NavBar: React.FC<NavBarProps> = ({ logoSrc, altText = "Logo" }) => {
  return (
    <div className="bg-brand-navy shadow-lg z-50 sticky top-0">
      <div className="w-full px-6 py-4 flex items-center justify-start relative">
        <img src={logoSrc} alt={altText} className="h-10 object-contain" />
         {/* Centered heading */}
         <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-3xl font-semibold tracking-wide">
          Milliman Health Dashboard
        </h1>
      </div>
    </div>
  );
};


export default NavBar;
 