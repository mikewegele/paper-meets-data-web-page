import React, { useEffect, useState } from "react";
import Wizzard from "./Wizzard";
import { makeStyles } from "tss-react/mui";
import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import If from "../../components/conditionals/If";
import WindIcon from "@mui/icons-material/Air";
import SunsetIcon from "@mui/icons-material/WbTwilight"
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const useStyles = makeStyles()(() => ({
    wizzardStartH2: {
        fontSize: "2rem",
        marginTop: "100px",
    },
    wizzardStartP: {
        color: "grey",
    },
    wizzardSimulationH2: {
        fontSize: "2rem",
        marginRight: "20px",
    },
    wizzardSimulationHeader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
    },
    wizzardSimulationSubheader: {
        color: "grey",
        position: "absolute",
        top: "75px",
        width: "500px",
        left: "calc(50% - 250px)",
        fontSize: "0.8rem"
    },
    wizzardSimulationDay: {
        fontWeight: "bold",
        fontSize: "1.4rem",
    },
    wizzardSimulationProperties: {
        display: "flex",
        justifyContent: "space-between",
    },
    button: {
        color: "#4caf50 !important",
        fontSize: "1.4rem",
        width: "400px"
    },
    wizzardSimulationMeasures: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "40%",
        fontSize: "1.4rem"
    },
    wizzardSimulationTipp: {
        backgroundColor: "#dedede",
        height: "100px",
        position: "absolute",
        width: "88%",
        left: "4%",
        bottom: "4%",
        borderRadius: "50px",
        color: "grey",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2%",
        lineHeight: "40px",
        fontSize: "1.2rem"
    }
}));

interface WizzardStartProps {
    onClose: () => void;
}

const WizzardStart: React.FC<WizzardStartProps> = (props) => {
    const [isSimulationActive, setIsSimulationActive] = useState(false);
    const [currentTippIndex, setCurrentTippIndex] = useState(0);

    const { classes } = useStyles();
    const progress = 40;
    const day = 4;
    const windSpeed = 4;
    const time = "17:00";
    const tips = [
        "Solar panels are a great investment for a green city. They harness the power of the sun, reducing your reliance on fossil fuels and lowering your carbon footprint.",
        "Don't forget to position wind turbines in areas with consistent, strong winds. The more wind, the more energy you can generate!",
        "Energy-efficient buildings help conserve resources and reduce waste. Upgrade your buildings whenever possible to save on energy costs and lower emissions.",
        "Think about public transport! Encouraging people to use buses, trains, or trams instead of cars will significantly reduce traffic and CO2 emissions.",
        "Energy storage systems allow you to store excess energy for later use. When demand is high, you’ll have the power you need.",
        "Planting trees not only beautifies your city but also improves air quality and provides natural cooling. Every green space counts.",
        "Keep an eye on your energy grid's efficiency to ensure that you're not wasting power. Balance renewable energy sources with demand.",
        "Geothermal energy provides a stable, renewable energy source. Use it to power your city's infrastructure with minimal environmental impact.",
        "Recycling is essential for reducing waste. Encourage citizens to recycle as much as possible to save resources and keep the city clean.",
        "Build green spaces like parks and gardens to enhance the quality of life in your city. Happy residents are more productive and contribute to the city's growth.",
    ];
    

    const startSimulation = () => {
        console.log(isSimulationActive)
        if (!isSimulationActive) {
            setIsSimulationActive(!isSimulationActive);
        }
    };

    useEffect(() => {
        if (isSimulationActive) {
            const interval = setInterval(() => {
                setCurrentTippIndex((prevIndex) => (prevIndex + 1) % tips.length);
            }, 3000); // Change tip every 10 seconds
            return () => clearInterval(interval); // Cleanup interval on component unmount
        }
    }, [isSimulationActive]);

    return !isSimulationActive ? (
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
                    Start
                </Button>
            </Box>
        </Wizzard>
    ) : (
        <Wizzard closable={false} onClose={props.onClose}>
            <div className={classes.wizzardSimulationHeader}>
                <h2 className={classes.wizzardSimulationH2}>Running Simulation</h2>
                <CircularProgress color="success" />
            </div>
            <p className={classes.wizzardSimulationSubheader}>Please wait while your City Build is being tested in a simulation.</p>
            <LinearProgress variant="determinate" value={progress} />
            <p className={classes.wizzardSimulationDay}>Day {day}</p>
            <Box className={classes.wizzardSimulationProperties}>
                <Button className={classes.button} endIcon={<WindIcon />} disabled>{`${windSpeed} km/h`}</Button>
                <Button className={classes.button} endIcon={<SunsetIcon />} disabled>{time}</Button>
                <Button className={classes.button} endIcon={<ThunderstormIcon />} disabled></Button>
            </Box>
            <Box className={classes.wizzardSimulationMeasures}>
                <p className={classes.button}>Measuring Energy Production...</p>
                <p className={classes.button}>Measuring Energy Consumption...</p>
                <p className={classes.button}>Measuring CO2 Footprint...</p>
            </Box>
            <Box className={classes.wizzardSimulationTipp}>
                <p>Tipp: {tips[currentTippIndex]}</p>
            </Box>
        </Wizzard>
    );
}

export default WizzardStart;