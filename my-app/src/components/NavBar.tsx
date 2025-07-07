// components/NavBar.tsx
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Divider, Button } from '@mui/material';

interface NavBarProps {
  logoSrc: string;
  altText?: string;
  onRerun?: () => void;
  showStopButton?: boolean;
  onStop?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  logoSrc,
  altText = "Logo",
  onRerun,
  showStopButton = false,
  onStop,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRerun = () => {
    onRerun?.();
    handleMenuClose();
  };

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
        <img src={logoSrc} alt={altText} className="h-14 object-contain" />
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-3xl font-semibold tracking-wide">
          Milliman Health Dashboard
        </h1>

        <div className="flex items-center gap-3">
          {showStopButton && (
            <div
              onClick={onStop}
              className="text-white font-semibold px-3 py-1 rounded-md cursor-pointer"
              style={{
                fontSize: '0.95rem',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
              }}
            >
              STOP
            </div>
          )}
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
        </div>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 160,
              borderRadius: 2,
              p: 0.5,
            },
          }}
          MenuListProps={{ dense: true }}
        >
          <MenuItem sx={{ color: '#131331' }} onClick={handleRerun}>
            Rerun <span style={{ marginLeft: "auto", fontSize: "0.8rem", opacity: 0.6 }}>Ctrl+R</span>
          </MenuItem>
          <MenuItem sx={{ color: '#131331' }} onClick={handleMenuClose}>Settings</MenuItem>
          <Divider />
          <MenuItem sx={{ color: '#131331' }} onClick={() => { window.print(); handleMenuClose(); }}>
            Print
          </MenuItem>
          <Divider />
          <MenuItem sx={{ color: '#131331' }} onClick={handleMenuClose}>About</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default NavBar;
