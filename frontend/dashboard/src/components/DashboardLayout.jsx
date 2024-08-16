import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  CssBaseline,
  IconButton,
  Box,
  TextField,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  LocalHospital,
  Person,
  Book,
  MedicalServices,
  CalendarToday,
  ListAlt,
  Menu as MenuIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate(); // For programmatic navigation
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Doctors', icon: <Person />, path: '/doctors' },
    { text: 'Clinics', icon: <LocalHospital />, path: '/clinics' },
    { text: 'Patients', icon: <Person />, path: '/patients' },
    { text: 'Bookings', icon: <Book />, path: '/bookings' },
    { text: 'Appointments', icon: <CalendarToday />, path: '/appointments' },
    { text: 'Medicine', icon: <MedicalServices />, path: '/medicine' },
    { text: 'Chronic Diseases', icon: <ListAlt />, path: '/chronic-diseases' },
    { text: 'Patient Medicine', icon: <MedicalServices />, path: '/patient-medicine' },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={handleDrawerToggle} // Close drawer on item click
              >
                <IconButton
                  sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}
                >
                  {item.icon}
                </IconButton>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  const handleQuickLinkClick = (path) => {
    navigate(path); // Navigate to the corresponding path
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (content) => {
    setModalContent(content);
    setOpenModal(true);
    setAnchorEl(null); // Close dropdown menu
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Hospital Management System
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ListItemButton onClick={() => handleQuickLinkClick('/doctors')}>
                <ListItemText primary="Doctors" />
              </ListItemButton>
              <ListItemButton onClick={() => handleQuickLinkClick('/patients')}>
                <ListItemText primary="Patients" />
              </ListItemButton>
              <ListItemButton onClick={() => handleQuickLinkClick('/medicine')}>
                <ListItemText primary="Medicine" />
              </ListItemButton>
            </Box>
            <TextField
              variant="outlined"
              placeholder="Search..."
              sx={{
                width: '40%',
                bgcolor: 'white',
                borderRadius: 1,
                ml: 4, // Added margin-left to move search bar to the right
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  '& fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiSvgIcon-root': {
                  color: 'primary.main',
                },
              }}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
          </Box>
          <IconButton color="inherit" sx={{ ml: 2 }} onClick={handleSettingsClick}>
            <SettingsIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => handleMenuItemClick('This hospital management system streamlines administrative and clinical processes, enhancing efficiency in managing patient records, appointments, and medical inventory. It offers features like appointment scheduling, patient data management, and real-time updates for medical staff.')}>About</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Doctors can manage their schedules, view patient records, prescribe treatments, and access medical history. They can also update patient information and communicate with other medical staff.')}>Doctor Info</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Patients can book appointments online by selecting a date and time, providing personal details, and choosing the desired doctor or specialty. The system also allows patients to view their appointment history and receive reminders.')}>Patient Booking</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ 
          width: { sm: 240 }, 
          flexShrink: { sm: 0 }, 
          bgcolor: '#e0e0e0',  // Light gray background
          boxShadow: '2px 0px 5px rgba(0,0,0,0.1)' // Subtle shadow
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240, 
              bgcolor: '#e0e0e0',  // Light gray background
              boxShadow: '2px 0px 5px rgba(0,0,0,0.1)' // Subtle shadow
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Settings Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{modalContent}</Typography>
          {/* Add more detailed content based on the selected menu item */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardLayout;
