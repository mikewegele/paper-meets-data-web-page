import React, {useCallback, useEffect, useState} from "react";
import Wizard from "./Wizard";
import {makeStyles} from "tss-react/mui";
import {Box, Button, CircularProgress, LinearProgress, Typography} from "@mui/material";
import If from "../../components/conditionals/If";
import WindIcon from "@mui/icons-material/Air";
import SunsetIcon from "@mui/icons-material/WbTwilight"
import CityScore from "../../pages/startscreen/CityScore";
import ErrorIcon from '@mui/icons-material/Error';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import simulationData from './week_weather_simulation.json';

const useStyles = makeStyles()(() => ({
    cityScore: {
        background: "none"
    },
    card: {
        backgroundColor: "#e8f5e9"
    },
    wizardStartH2: {
        fontSize: "2rem",
        marginTop: "100px",
        marginBottom: "30px",
    },
    simulationResults: {
        marginTop: "30px",
        fontSize: "2rem",
        marginBottom: "10px"
    },
    wizardStartP: {
        color: "grey",
    },
    wizardSimulationH2: {
        fontSize: "2rem",
        marginRight: "20px",
    },
    wizardSimulationHeader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
    },
    wizardSimulationSubheader: {
        color: "grey",
        position: "absolute",
        top: "75px",
        width: "500px",
        left: "calc(50% - 250px)",
        fontSize: "0.8rem"
    },
    wizardSimulationDay: {
        fontWeight: "bold",
        fontSize: "1.2rem",
        marginTop: "25px"
    },
    wizardSimulationProperties: {
        display: "flex",
        justifyContent: "space-between",
    },
    button: {
        color: "#4caf50 !important",
        fontSize: "1.4rem",
        width: "400px"
    },
    startButton: {
        marginTop: "30px"
    },
    measuringP: {
        color: "#4caf50",
        fontSize: "1.4rem",
        padding: "5px"
    },
    wizardSimulationMeasures: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "40%",
        fontSize: "1.4rem"
    },
    wizardSimulationTipp: {
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
    },
    wizardResultEntryContainer: {
        textAlign: "left",
        margin: "20px 0"
    },
    wizardResultEntry: {
        backgroundColor: "#dedede",
        borderRadius: "50px",
        position: "relative",
        height: "80px",
        color: "grey",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    wizardResultEntryDetails: {
        display: "flex",
        position: "absolute",
        right: "20px",
        bottom: "0",
        fontSize: "0.8rem"
    },
    wizardResultEntryErrorIcon: {
        position: "absolute",
        left: "20px",
    },
    wizardSave: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    wizardSimulationPercentage: {},
}));

interface Props {
    onClose: () => void;
}

const WizardStart: React.FC<Props> = (props) => {

    const [isSimulationActive, setIsSimulationActive] = useState(false);
    const [currentHintIndex, setCurrentHintIndex] = useState(0);
    const [progress, setProgress] = useState<number>(0);
    const [isProgressFinished, setIsProgressFinished] = useState(false);
    const [isDetailsView, setIsDetailsView] = useState(false);
    const [isSaveResults, setIsSaveResults] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentData, setCurrentData] = useState(simulationData[0]);

    const {classes} = useStyles();
    const hints = [
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

    const toggleTotalView = useCallback(() => {
        setIsDetailsView(false);
    }, []);

    const toggleDetailsView = useCallback(() => {
        setIsDetailsView(true);
    }, []);

    const startSimulation = useCallback(() => {
        console.log(isSimulationActive)
        !isSimulationActive && setIsSimulationActive(!isSimulationActive);
    }, [isSimulationActive]);

    const saveResults = useCallback(() => {
        setIsSaveResults(true)
        const interval = setInterval(() => {
            setIsSimulationActive(false)
            setProgress(0)
            setIsProgressFinished(false)
            setIsDetailsView(false)
            setIsSaveResults(false)
            setIsFinished(true)
        }, 3000);
        setIsFinished(false)
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Handle hints
        let hintInterval: NodeJS.Timeout | null = null;
        if (isSimulationActive) {
            hintInterval = setInterval(() => {
                setCurrentHintIndex((prevIndex) => (prevIndex + 1) % hints.length);
            }, 3000);
        }

        return () => {
            if (hintInterval) clearInterval(hintInterval);
        };
    }, [isSimulationActive, hints.length]);

    useEffect(() => {
        // Handle simulation progress
        let progressInterval: NodeJS.Timeout | null = null;
        if (isSimulationActive) {
            progressInterval = setInterval(() => {
                setCurrentStep((prevStep) => {
                    const nextStep = prevStep + 1;
                    const progressPercent = Math.round(((nextStep + 1) / simulationData.length) * 100);
                    setProgress(progressPercent);
                    if (nextStep < simulationData.length) {
                        setCurrentData(simulationData[nextStep]);
                        return nextStep;
                    } else {
                        clearInterval(progressInterval!);
                        setIsSimulationActive(false);
                        return prevStep; // End simulation
                    }
                });
            }, 200);
            if (progress === 100) {
                setIsProgressFinished(true);
            }
        }

        return () => {
            if (progressInterval) clearInterval(progressInterval);
        };
    }, [isSimulationActive, simulationData.length, progress]);

    return isFinished ? null
        : (isSaveResults ? (
            <Wizard closable={false} onClose={props.onClose}>
                <div className={classes.wizardSave}>
                    <Typography variant="h2" className={classes.wizardSimulationH2}>Your test results will be
                        saved...</Typography>
                    <CircularProgress color="success"/>
                </div>
            </Wizard>
        ) : isProgressFinished ? (
            <Wizard closable={false} onClose={props.onClose}>
                <Typography variant="h2" className={classes.simulationResults}>Simulation Results</Typography>
                <LinearProgress variant="determinate" value={progress}/>
                <Box sx={{display: 'flex', justifyContent: 'center', mb: 2, mt: 2, gap: 4}}>
                    <Button
                        variant={!isDetailsView ? "contained" : "outlined"}
                        color="success"
                        onClick={toggleTotalView}>
                        Total Score
                    </Button>
                    <Button
                        variant={isDetailsView ? "contained" : "outlined"}
                        color="success"
                        sx={{mr: 2}}
                        onClick={toggleDetailsView}>
                        Details
                    </Button>
                </Box>
                <If condition={isDetailsView}>
                    <div className={classes.wizardResultEntryContainer}>
                        <Typography variant="h4">Day {Math.floor(currentStep / 24) + 1}</Typography>
                        <div className={classes.wizardResultEntry}>
                            <ErrorIcon className={classes.wizardResultEntryErrorIcon} fontSize="large"/>
                            <Typography>Energy was not covered.</Typography>
                            <Box className={classes.wizardResultEntryDetails}>
                                <Button endIcon={<WindIcon/>} disabled>{`${currentData.windSpeed} km/h`}</Button>
                                <Button endIcon={<SunsetIcon/>} disabled>{currentData.hour}</Button>
                                <If condition={currentData.weather === "sunny"}>
                                    <Button endIcon={<WbSunnyIcon/>} disabled></Button>
                                </If>
                                <If condition={currentData.weather === "rainy"}>
                                    <Button endIcon={<WaterDropIcon/>} disabled></Button>
                                </If>
                                <If condition={currentData.weather === "cloudy"}>
                                    <Button endIcon={<WbCloudyIcon/>} disabled></Button>
                                </If>
                                <If condition={currentData.weather === "night"}>
                                    <Button endIcon={<NightsStayIcon/>} disabled></Button>
                                </If>
                            </Box>
                        </div>
                    </div>
                    <div className={classes.wizardResultEntryContainer}>
                        <Typography variant="h4">Total</Typography>
                        <div className={classes.wizardResultEntry}>
                            <ErrorIcon className={classes.wizardResultEntryErrorIcon} fontSize="large"/>
                            <Typography>CO2 Footprint is very high.</Typography>
                        </div>
                    </div>
                </If>
                <If condition={!isDetailsView}>
                    <CityScore
                        cityScoreClassName={classes.cityScore}
                        cardClassName={classes.card}
                        score={4}
                        co2={5}
                        power={4}
                        efficiency={3}/>
                </If>
                <Box sx={{display: 'flex', justifyContent: 'center', mb: 2}}>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{mr: 2, mt: 2}}
                        onClick={saveResults}>
                        Continue
                    </Button>
                </Box>
            </Wizard>
        ) : (!isSimulationActive ? (
            <Wizard closable={true} onClose={props.onClose}>
                <Typography variant="h2" className={classes.wizardStartH2}>Do you want to start the simulation to test
                    you City Build?</Typography>
                <Typography className={classes.wizardStartP}>The simulation can take a while to finish. Your city will
                    be tested
                    in different scenarios to get you a rating based on stability, efficiency and
                    satisfaction.</Typography>
                <Typography className={classes.wizardStartP}>Press start to continue or close this window to further
                    construct
                    your city.</Typography>
                <Box sx={{display: 'flex', justifyContent: 'center', mb: 2}}>
                    <Button
                        className={classes.startButton}
                        variant="contained"
                        color="success"
                        sx={{mr: 2}}
                        onClick={startSimulation}>
                        Start
                    </Button>
                </Box>
            </Wizard>
        ) : (
            <Wizard closable={false} onClose={props.onClose}>
                <div className={classes.wizardSimulationHeader}>
                    <Typography variant="h2" className={classes.wizardSimulationH2}>Running Simulation</Typography>
                    <Typography className={classes.wizardSimulationPercentage}>{`${progress}%`}</Typography>
                </div>
                <Typography className={classes.wizardSimulationSubheader}>Please wait while your City Build is being
                    tested in a
                    simulation.</Typography>
                <LinearProgress variant="determinate" value={progress}/>
                <Typography className={classes.wizardSimulationDay}>Day {Math.floor(currentStep / 24) + 1}</Typography>
                <Box className={classes.wizardSimulationProperties}>
                    <Button className={classes.button} endIcon={<WindIcon/>}
                            disabled>{`${currentData.windSpeed} km/h`}</Button>
                    <Button className={classes.button} endIcon={<SunsetIcon/>} disabled>{currentData.hour}</Button>
                    <If condition={currentData.weather === "sunny"}>
                        <Button className={classes.button} endIcon={<WbSunnyIcon/>} disabled></Button>
                    </If>
                    <If condition={currentData.weather === "rainy"}>
                        <Button className={classes.button} endIcon={<WaterDropIcon/>} disabled></Button>
                    </If>
                    <If condition={currentData.weather === "cloudy"}>
                        <Button className={classes.button} endIcon={<WbCloudyIcon/>} disabled></Button>
                    </If>
                    <If condition={currentData.weather === "night"}>
                        <Button className={classes.button} endIcon={<NightsStayIcon/>} disabled></Button>
                    </If>
                </Box>
                <Box className={classes.wizardSimulationMeasures}>
                    <Typography className={classes.measuringP}>Measuring Energy Production...</Typography>
                    <Typography className={classes.measuringP}>Measuring Energy Consumption...</Typography>
                    <Typography className={classes.measuringP}>Measuring CO2 Footprint...</Typography>
                </Box>
                <Box className={classes.wizardSimulationTipp}>
                    <Typography>Hint: {hints[currentHintIndex]}</Typography>
                </Box>
            </Wizard>
        )));
}

export default WizardStart;