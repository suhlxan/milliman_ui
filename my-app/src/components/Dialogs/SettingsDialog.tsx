// import React, { useEffect, useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   FormControlLabel,
//   Switch,
//   Select,
//   MenuItem,
//   Button,
//   SelectChangeEvent,
// } from '@mui/material';

// interface SettingsDialogProps {
//   open: boolean;
//   onClose: () => void;
//   currentTheme: string;
//   onThemeChange: (theme: string) => void;
// }

// const SettingsDialog: React.FC<SettingsDialogProps> = ({
//   open,
//   onClose,
//   currentTheme,
//   onThemeChange,
// }) => {
//   const [runOnSave, setRunOnSave] = useState(true);
//   const [wideMode, setWideMode] = useState(false);
//   const [theme, setTheme] = useState(currentTheme);

//   useEffect(() => {
//     setTheme(currentTheme);
//   }, [currentTheme]);

//   const handleThemeSelect = (e: SelectChangeEvent) => {
//     const selectedTheme = e.target.value;
//     setTheme(selectedTheme);
//     onThemeChange(selectedTheme);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Settings</DialogTitle>
//       <DialogContent dividers>
//         {/* Development Section */}
//         <Typography variant="subtitle1" gutterBottom>
//           Development
//         </Typography>
//         <FormControlLabel
//           control={
//             <Switch
//               checked={runOnSave}
//               onChange={() => setRunOnSave(!runOnSave)}
//             />
//           }
//           label="Run on save"
//         />
//         <Typography variant="body2" color="textSecondary" gutterBottom>
//           Automatically updates the app when the underlying code is updated.
//         </Typography>

//         {/* Appearance Section */}
//         <Typography variant="subtitle1" mt={3} gutterBottom>
//           Appearance
//         </Typography>
//         <FormControlLabel
//           control={
//             <Switch
//               checked={wideMode}
//               onChange={() => setWideMode(!wideMode)}
//             />
//           }
//           label="Wide mode"
//         />
//         <Typography variant="body2" color="textSecondary" gutterBottom>
//           Turn this on to make this app occupy the entire width of the screen.
//         </Typography>

//         <Typography variant="body2" mt={2}>
//           Choose app theme, colors and fonts
//         </Typography>
//         <Select
//           fullWidth
//           value={theme}
//           onChange={handleThemeSelect}
//           sx={{ mt: 1 }}
//         >
//           <MenuItem value="system">Use system setting</MenuItem>
//           <MenuItem value="light">Light</MenuItem>
//           <MenuItem value="dark">Dark</MenuItem>
//         </Select>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} variant="outlined">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default SettingsDialog;
