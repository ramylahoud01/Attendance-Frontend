import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import AOS from 'aos';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import 'aos/dist/aos.css';
// Define shared styles
const cardContainerStyle = {
    margin: '30px 50px',
    backgroundColor: 'white',
    borderRadius: '10px',
};

const innerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const imageContainerStyle = {
    height: '350px',
};

const textStyle = {
    fontWeight: 'bold',
    color: '#2F4F4F',
    fontSize: '24px',
};

const MainCard = ({ title, image, inReverse }) => {
    const theme = useTheme();
    const ExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            {!inReverse && !ExtraSmallScreen && (
                <Typography component={'div'} style={{ ...cardContainerStyle, borderLeft: '2px solid #E8E8E8' }}>
                    <Typography component={'div'} style={{ ...innerContainerStyle }}>
                        <Typography component={'div'} style={{ ...textStyle, display: 'flex', alignItems: 'center', marginLeft: '100px' }}  >
                            <h4 style={{ margin: 0, maxWidth: '600px' }}>{title}</h4>
                        </Typography>
                        <Typography component={'div'} style={{ ...imageContainerStyle, clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
                            <img src={image} alt="QrScan" width='100%' height='100%' style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px', objectFit: 'cover' }} />
                        </Typography>
                    </Typography>
                </Typography>
            )}
            {inReverse && !ExtraSmallScreen && (
                <Typography component={'div'} style={{ ...cardContainerStyle, borderRight: '2px solid #E8E8E8' }}>
                    <Typography component={'div'} style={{ ...innerContainerStyle }}>
                        <Typography component={'div'} style={{ ...imageContainerStyle }}>
                            <img src={image} alt="QrScan" width='100%' height='100%' style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', objectFit: 'cover' }} />
                        </Typography>
                        <Typography component={'div'} style={{ ...textStyle, display: 'flex', alignItems: 'center', marginRight: '100px' }} >
                            <h3>{title}</h3>
                        </Typography>
                    </Typography>
                </Typography>
            )}
            {!inReverse && ExtraSmallScreen && (
                <Typography component={'div'} style={{ ...cardContainerStyle, borderLeft: '2px solid #E8E8E8' }}>
                    <Grid container direction="column" style={innerContainerStyle}>
                        <Grid item style={imageContainerStyle}>
                            <img src={image} alt="QrScan" width="100%" height="100%" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px', objectFit: 'cover' }} />
                        </Grid>
                        <Grid item style={{ ...textStyle, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', marginLeft: '5px' }}>
                            <h5 style={{ margin: 0, maxWidth: '600px' }}>{title}</h5>
                        </Grid>
                    </Grid>
                </Typography>
            )}
            {inReverse && ExtraSmallScreen && (
                <Typography component={'div'} style={{ ...cardContainerStyle, borderRight: '2px solid #E8E8E8' }}>
                    <Grid container direction="column" style={innerContainerStyle}>
                        <Grid item style={imageContainerStyle}>
                            <img src={image} alt="QrScan" width="100%" height="100%" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', objectFit: 'cover' }} />
                        </Grid>
                        <Grid item style={{ ...textStyle, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', marginLeft: '5px' }}>
                            <h5 style={{ margin: 0, maxWidth: '600px' }}>{title}</h5>
                        </Grid>
                    </Grid>
                </Typography>
            )}
        </>
    );
};

export default MainCard;
