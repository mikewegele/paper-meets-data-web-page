import React from "react";
import {Box} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import HeaderCenter from "./HeaderCenter";

const useStyles = makeStyles()(() => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#e8f5e9"
    }
}));

const Header: React.FC = () => {
    const {classes} = useStyles();

    return (
        <Box className={classes.header}>
            <HeaderLeft windSpeed={15} time="18:00"/>
            <HeaderCenter cityName="Berlin"/>
            <HeaderRight money="1000" population={3748000}/>
        </Box>
    );
};

export default Header;
