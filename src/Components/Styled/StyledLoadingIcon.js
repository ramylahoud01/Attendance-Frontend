import React from 'react';

const StyledLoadingIcon = () => {
    const spinnerStyle = {
        width: '25px',
        height: '25px',
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        borderLeftColor: 'white',
        animation: 'spin 1s infinite linear',
    };

    const keyframes = `@keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }`;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <style>{keyframes}</style>
            <div style={spinnerStyle}></div>
        </div>
    );
};

export default StyledLoadingIcon;
