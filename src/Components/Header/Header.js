import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Link, NavLink, useSubmit } from 'react-router-dom';
import logo from "../Image/Logo.png"
import authHeader from '../../Services/isAuth.service';

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
    const isAuth = authHeader()
    const submit = useSubmit()
    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <Toolbar style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/" style={{ alignItems: 'center', textDecoration: 'none', display: 'flex', margin: 0, padding: 0, marginLeft: '30px' }}>
                            <Typography component={'img'} variant='img' src={logo} alt="Logo" sx={{ width: { xs: '50px' }, height: { xs: '46px' }, display: 'inline-block' }} borderRadius={'50%'} />
                        </Link>
                        <Typography sx={{ display: 'flex' }} variant='div'>
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
                            <NavLink
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
                            </NavLink>
                            <NavLink
                                to={`/aboutUs`}
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
                                ABOUT US
                            </NavLink>
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
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </React.Fragment>
    );
}