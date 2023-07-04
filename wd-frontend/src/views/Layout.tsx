import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect } from "react";
import { UserContext } from "../App";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { User } from "../models/User";

const Layout = () => {
    const { loggedUser, setLoggedUser } = React.useContext(UserContext);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

    const allPages = [
        { name: 'Home', path: '/home' },
        { name: 'Users', path: '/users' },
        { name: 'Clubs', path: '/clubs' }
    ];

    const [pages, setPages] = React.useState(allPages);



    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: any) => {
        setAnchorEl(null);
        if (event === 'Logout') {
            setLoggedUser(new User('', '', '', 'user', '', '', 'active', new Date(), new Date()));
            sessionStorage.removeItem('loggedUser');
            navigate('/login');
        }
        else if (event === 'My account') {
            navigate(`users/${loggedUser.id}`)
        }
    };

    useEffect(() => {
        if (!loggedUser || !loggedUser.email) {
            navigate('/login');
        } else if (loggedUser.email && loggedUser.role !== 'admin') {
            setPages(pages.filter(page => page.name !== 'Users'));
        } else {
            setPages(allPages);
            navigate('/home');
        }
    }, [loggedUser]);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    {loggedUser?.avatar && <> <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={(event) => setAnchorEl2(event.currentTarget)}
                    >
                        <MenuIcon />
                    </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl2}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl2)}
                            onClose={() => setAnchorEl2(null)}
                        >
                            {pages.map(page => <MenuItem key={page.name} onClick={() => setAnchorEl2(null)}>
                                <NavLink to={page.path} style={{ textDecoration: 'none' }}>{page.name}</NavLink>
                            </MenuItem>)}
                        </Menu> </>}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        We Dance
                    </Typography>
                    {loggedUser?.avatar && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                {loggedUser.avatar ? <Avatar alt="Remy Sharp" src={loggedUser.avatar} /> : <AccountCircle />}
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
                                <MenuItem onClick={() => handleClose('My account')}>My account</MenuItem>
                                <MenuItem onClick={() => handleClose('Logout')}>Log out</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                placeContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 168px)',
                padding: '20px'
            }}>
                <Outlet />
            </Box>
            <Box component={'footer'} sx={{
                height: '64px',
                width: '100%',
                backgroundColor: '#1976d2'
            }}></Box>
        </Box>
    );
};

export default Layout;