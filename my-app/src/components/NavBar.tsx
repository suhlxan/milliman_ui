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
        <img src={logoSrc} alt={altText} className="h-12 object-contain cursor-pointer" 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}/>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl font-semibold tracking-wide">
          Deep Research Health Agent
        </h1>

        <div className="flex items-center gap-3">
          {showStopButton && (
            <>
              <img
                src="data:image/gif;base64,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"
                alt="Loading animation"
                style={{
                  height: '28px',
                  marginRight: '8px',
                  filter: 'brightness(0) invert(1)', // makes dark GIF appear white
                }}
              />
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
            </>
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
 