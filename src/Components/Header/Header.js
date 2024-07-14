import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Link, NavLink, useSubmit } from 'react-router-dom';
import logo from "../Image/Boulanger-Logo.png"
import authHeader from '../../Services/isAuth.service';
import { useTheme } from '@emotion/react';
import { IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function Header(props) {
    const theme = useTheme();
    const ExtraSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const isAuth = authHeader()
    const submit = useSubmit()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = () => {
        handleClose();
    };
    const linkStyle = ({ isActive, isTransitioning }) => ({
        fontWeight: "bold",
        color: isActive ? '#2F4F4F' : '#A9A9A9',
        viewTransitionName: isTransitioning ? "slide" : "",
        textDecoration: "none",
        marginRight: "30px",
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif'
    });
    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/" style={{ alignItems: 'center', textDecoration: 'none', display: 'flex', margin: 0, padding: 0, marginLeft: '30px' }}>
                            <Typography component={'img'} variant='img' src={logo} alt="Logo" sx={{ width: { xs: '120px' }, height: { xs: '46px' }, display: 'inline-block' }} borderRadius='2px' />
                        </Link>
                        {!ExtraSmallScreen && <Typography sx={{ display: 'flex' }} variant='div'>
                            <NavLink
                                to={`/`}
                                style={({ isActive, isTransitioning }) => ({
                                    fontWeight: "bold",
                                    color: isActive ? '	#2F4F4F' : '#A9A9A9',
                                    viewTransitionName: isTransitioning ? "slide" : "",
                                    textDecoration: "none",
                                    marginRight: "30px",
                                    fontSize: '14px',
                                    fontFamily: 'Helvetica, Arial, sans-serif'
                                })}
                            >
                                HOME
                            </NavLink>
                            {isAuth && <NavLink
                                to={`/employees/details`}
                                style={({ isActive, isTransitioning }) => ({
                                    fontWeight: "bold",
                                    color: isActive ? '	#2F4F4F' : '#A9A9A9',
                                    viewTransitionName: isTransitioning ? "slide" : "",
                                    textDecoration: "none",
                                    marginRight: "30px",
                                    fontSize: '14px',
                                    fontFamily: 'Helvetica, Arial, sans-serif'
                                })}
                            >
                                TEAM MEMBER
                            </NavLink>}
                            {isAuth && <NavLink
                                to={`/entire/schedule`}
                                style={({ isActive, isTransitioning }) => ({
                                    fontWeight: "bold",
                                    color: isActive ? '	#2F4F4F' : '#A9A9A9',
                                    viewTransitionName: isTransitioning ? "slide" : "",
                                    textDecoration: "none",
                                    marginRight: "30px",
                                    fontSize: '14px',
                                    fontFamily: 'Helvetica, Arial, sans-serif'
                                })}
                            >
                                SCHEDULE
                            </NavLink>}
                            {isAuth && <NavLink
                                to={`/timetrack`}
                                style={({ isActive, isTransitioning }) => ({
                                    fontWeight: "bold",
                                    color: isActive ? '	#2F4F4F' : '#A9A9A9',
                                    viewTransitionName: isTransitioning ? "slide" : "",
                                    textDecoration: "none",
                                    marginRight: "30px",
                                    fontSize: '14px',
                                    fontFamily: 'Helvetica, Arial, sans-serif'
                                })}
                            >
                                TIME TRACK
                            </NavLink>}
                            <NavLink
                                to={!isAuth ? '/login' : '/'}
                                style={({ isActive, isTransitioning }) => ({
                                    fontWeight: "bold",
                                    color: (isActive && !isAuth) ? '#2F4F4F' : '#A9A9A9',
                                    viewTransitionName: isTransitioning ? "slide" : "",
                                    textDecoration: "none",
                                    marginRight: "30px",
                                    fontSize: '14px',
                                    fontFamily: 'Helvetica, Arial, sans-serif'
                                })}
                                type="submit"
                                onClick={() => submit(null, { action: '/logout', method: 'POST' })}
                            >
                                {!isAuth ? 'LOGIN' : 'LOGOUT'}
                            </NavLink>
                        </Typography>}
                        {ExtraSmallScreen && (
                            <>
                                <IconButton
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleMenuItemClick}><NavLink to="/" style={linkStyle}>HOME</NavLink></MenuItem>
                                    {isAuth && <MenuItem onClick={handleMenuItemClick}><NavLink to="/employees/details" style={linkStyle}>TEAM MEMBER</NavLink></MenuItem>}
                                    {isAuth && <MenuItem onClick={handleMenuItemClick}><NavLink to="/entire/schedule" style={linkStyle}>SCHEDULE</NavLink></MenuItem>}
                                    {isAuth && <MenuItem onClick={handleMenuItemClick}><NavLink to="/timetrack" style={linkStyle}>TIME TRACK</NavLink></MenuItem>}
                                    <MenuItem onClick={handleMenuItemClick}>
                                        <NavLink
                                            to={!isAuth ? '/login' : '/'}
                                            style={linkStyle}
                                            type="submit"
                                            onClick={() => submit(null, { action: '/logout', method: 'POST' })}
                                        >
                                            {!isAuth ? 'LOGIN' : 'LOGOUT'}
                                        </NavLink>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </React.Fragment>
    );
}