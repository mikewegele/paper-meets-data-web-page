import React, { useState } from "react";
import Wizzard from "./Wizzard";
import { makeStyles } from "tss-react/mui";
import { Box, Button } from "@mui/material";
import If from "../../components/conditionals/If";

const useStyles = makeStyles()(() => ({
    wizzardStartH2: {
        fontSize: "2rem",
        marginTop: "100px",
    },
    wizzardStartP: {
        color: "grey",
    }
}));

const WizzardSimulation: React.FC = () => {
    const { classes } = useStyles();

    // I hate ts and no idea how to pass nothing to onClose
    const help = () => {
    };

    return (
        <Wizzard closable={false} onClose={help}> 
            <h2 className={classes.wizzardStartH2}>Do you want to start the simulation to test you City Build?</h2>
            <p className={classes.wizzardStartP}>The simulation can take a while to finish. Your city will be tested in different scenarios to get you a rating based on stability, efficiency and satisfaction.</p>
            <p className={classes.wizzardStartP}>Press start to continue or close this window to further construct your city.</p>
        </Wizzard>
    );
}

export default WizzardSimulation;