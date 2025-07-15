// components/NavBar.tsx

import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import NavMenu from './NavMenu';
import StopButton from './StopButton';

interface NavBarProps {
  logoSrc: string;
  altText?: string;
  onRerun?: () => void;
  showStopButton?: boolean;
  onStop?: () => void;
}

/**
 * NavBar Component
 * ------------------------------------------------------------------------------
 * The top application bar that includes a logo, app title, rerun/stop controls,
 * and dropdown actions menu.
 */
const NavBar: React.FC<NavBarProps> = ({
  logoSrc,
  altText = "Logo",
  onRerun,
  showStopButton = false,
  onStop,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Open/close dropdown menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Keyboard shortcut: Ctrl+R or Cmd+R triggers rerun
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
        e.preventDefault();
        onRerun?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRerun]);

  return (
    <div className="bg-brand-navy shadow-lg z-50 sticky top-0">
      <div className="w-full px-6 py-4 flex items-center justify-between relative">
        
        {/* Left: Logo (click scrolls to top) */}
        <img
          src={logoSrc}
          alt={altText}
          className="h-12 object-contain cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        {/* Center: App Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl font-semibold tracking-wide">
          Deep Research Health Agent
        </h1>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {showStopButton && onStop && <StopButton onStop={onStop} />}

          <IconButton
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{
              color: "white",
              '&:hover': {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>

          {/* Dropdown menu */}
          <NavMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onRerun={onRerun}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
