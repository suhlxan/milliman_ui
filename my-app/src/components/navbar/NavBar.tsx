import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import NavMenu from './NavMenu';
import StopButton from './StopButton';
//import SettingsDialog from '../Dialogs/SettingsDialog';

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
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false); //  Add state for settings dialog
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePrint = () => {
    window.print();
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
    <div className="bg-brand-navy shadow-lg z-50 sticky top-0 non-printable">
      <div className="w-full px-6 py-4 flex items-center justify-between relative">
        <img
          src={logoSrc}
          alt={altText}
          className="h-12 object-contain cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl font-semibold tracking-wide">
          Deep Research Health Agent
        </h1>

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

          <NavMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onRerun={onRerun}
            onPrint={handlePrint}
            onAbout={() => setShowAbout(true)}
            onSettings={() => setShowSettings(true)} //  Pass settings handler
          />
        </div>
      </div>

      {/*  About Dialog with Close Button */}
      <Dialog
        open={showAbout}
        onClose={() => setShowAbout(false)}
        PaperProps={{
          sx: {
            width: '400px',
            height: '300px', 
            maxWidth: 'none',
            borderRadius: 2,
            boxShadow: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            overflow: 'hidden', // Prevent scrollbars
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Made with</DialogTitle>

        {/* <DialogContent>
          <Typography variant="body2" gutterBottom>
            React v19.1.0 <br />
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1976d2', textDecoration: 'underline' }}
            >
              React.dev
            </a>
            <br />
            Copyright 2025 Snowflake Inc. All rights reserved.
          </Typography>
          <Button onClick={() => setShowAbout(false)} sx={{ mt: 2 }} variant="outlined">
            Close
          </Button>
        </DialogContent> */}
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            React v19.1.0 <br />
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1976d2', textDecoration: 'underline' }}
            >
              react.dev
            </a>
            <br /><br />
            MUI Material v5 <br />
            <a
              href="https://mui.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1976d2', textDecoration: 'underline' }}
            >
              mui.com
            </a>
            <br /><br />
            Copyright 2025 Snowflake Inc. All rights reserved.
          </Typography>
          <Button onClick={() => setShowAbout(false)} sx={{ mt: 2 }} variant="outlined">
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/*  Settings Dialog */}
      {/* <SettingsDialog open={showSettings} onClose={() => setShowSettings(false)} /> */}
    </div>
  );
};

export default NavBar;
