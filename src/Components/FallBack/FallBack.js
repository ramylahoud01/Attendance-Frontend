import React from "react";
import ReactLoading from "react-loading";

const FallBack = () => (
    <div
        style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
        }}
    >
        <ReactLoading color="#2F4F4F" type="spinningBubbles" width="80px" height="80px" />
    </div>
);

export default FallBack;
