import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { userSession, wallet } from '../../services/wallet';

import { useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CreateKaroake from '../modal/CreateKaroake';
const fabStyle = { position: 'fixed', bottom: 16, right: 16, };
const fabGreenStyle = { color: 'common.white', bgcolor: green[500], '&:hover': { bgcolor: green[600], }, };
const fabs = [{ color: 'primary', sx: fabStyle, icon: <AddIcon />, label: 'Add', },];

const Search = styled('div')(({ theme }) => ({ position: 'relative', borderRadius: theme.shape.borderRadius, backgroundColor: alpha(theme.palette.common.white, 0.15), '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25), }, marginLeft: 0, width: '100%', [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(1), width: 'auto', }, }));
const SearchIconWrapper = styled('div')(({ theme }) => ({ padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', }));
const StyledInputBase = styled(InputBase)(({ theme }) => ({ color: 'inherit', '& .MuiInputBase-input': { padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)})`, transition: theme.transitions.create('width'), width: '100%', [theme.breakpoints.up('sm')]: { width: '12ch', '&:focus': { width: '20ch', }, }, }, }));
const darkTheme = createTheme({ palette: { mode: 'dark', primary: { main: '#1976d2', }, }, });

const DashBoardHeader = ({ }) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const transitionDuration = { enter: theme.transitions.duration.enteringScreen, exit: theme.transitions.duration.leavingScreen, };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} />
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <div>
                <IconButton size="small" aria-controls="menu-appbar" aria-haspopup="false" color="inherit" />
              </div>
              {userSession.isUserSignedIn() && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={() => wallet.logout()}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
            {fabs.map((fab, index) => (
              <Zoom
                key={fab.color}
                in={value === index}
                timeout={transitionDuration}
                style={{
                  transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
              >
                <Fab sx={fab.sx} aria-label={fab.label} color={fab.color} onClick={() => setOpen(true)}>
                  {fab.icon}
                </Fab>
              </Zoom>
            ))}
          </AppBar>
        </ThemeProvider>

      </Box>
      <CreateKaroake open={open} close={() => setOpen(false)} />
    </>
  );
}
export default DashBoardHeader;