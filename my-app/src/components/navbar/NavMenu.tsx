// // components/navbar/NavMenu.tsx
import React from 'react';
import { Menu, MenuItem, Divider } from '@mui/material';

interface NavMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onRerun?: () => void;
  onPrint?: () => void;
  onAbout?: () => void;
  onSettings?: () => void;
}

// /**
//  * NavMenu Component
//  * ----------------------------------------------------------------------------
//  * Dropdown menu for navigation bar actions like rerunning logic, printing,
//  * or accessing settings/about. Connected to a vertical "More" icon.
//  */

const NavMenu: React.FC<NavMenuProps> = ({
  anchorEl,
  open,
  onClose,
  onRerun,
  onPrint,
  onAbout,
  onSettings,
}) => {
  const handleRerun = () => {
    onRerun?.();
    onClose();
  };

  const handlePrint = () => {
    onPrint?.();
    onClose();
  };

  const handleAbout = () => {
    onAbout?.();
    onClose();
  };

  const handleSettings = () => {
    onSettings?.();
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
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

      <MenuItem sx={{ color: '#131331' }} onClick={handleSettings}>
        Settings
      </MenuItem>

      <Divider />

      <MenuItem sx={{ color: '#131331' }} onClick={handlePrint}>
        Print
      </MenuItem>

      <Divider />

      <MenuItem sx={{ color: '#131331' }} onClick={handleAbout}>
        About
      </MenuItem>
    </Menu>
  );
};

export default NavMenu;
