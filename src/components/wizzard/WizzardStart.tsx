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

interface WizzardStartProps {
    onClose: () => void;
}

const WizzardStart: React.FC<WizzardStartProps> = (props) => {
    const [isSimulationActive, setIsSimulationActive] = useState(false);
    const { classes } = useStyles();

    const startSimulation = () => {
        console.log(isSimulationActive)
        if (!isSimulationActive) {
            setIsSimulationActive(!isSimulationActive);
        }
    };

    return (
        <Wizzard closable={true} onClose={props.onClose}> 
            <h2 className={classes.wizzardStartH2}>Do you want to start the simulation to test you City Build?</h2>
            <p className={classes.wizzardStartP}>The simulation can take a while to finish. Your city will be tested in different scenarios to get you a rating based on stability, efficiency and satisfaction.</p>
            <p className={classes.wizzardStartP}>Press start to continue or close this window to further construct your city.</p>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ mr: 2 }}
                    onClick={startSimulation}>
                    Run Simulation
                </Button>
            </Box>
            <If condition={isSimulationActive}>
            </If>
        </Wizzard>
    );
}

export default WizzardStart;