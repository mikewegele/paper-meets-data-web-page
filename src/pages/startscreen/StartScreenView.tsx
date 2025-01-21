import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import CityScore from "./CityScore";
import If from "../../components/conditionals/If";
import WizardStart from "../../components/wizzard/WizardStart";
import Dnd from "./drag/Dnd";

interface Props {
    score: number;
    co2: number;
    power: number;
    efficiency: number;
}

const StartScreenView: React.FC<Props> = ({score, co2, power, efficiency}) => {
    const [isBrowseBuildings, setIsBrowseBuildings] = useState(false);
    const [isSimulationActive, setIsSimulationActive] = useState(false);

    const toggleView = () => {
        setIsBrowseBuildings(!isBrowseBuildings);
    };

    const runSimulation = () => {
        console.log(isSimulationActive)
        if (!isSimulationActive) {
            setIsSimulationActive(!isSimulationActive);
        }
    };

    const handleSimulationEnd = () => {
        setIsSimulationActive(false);
    };

    return (
        <>
            <CityScore score={score} co2={co2} power={power} efficiency={efficiency}/>

            <Box sx={{display: 'flex', justifyContent: 'center', mb: 2}}>
                <Button
                    variant="contained"
                    color="success"
                    sx={{mr: 2}}
                    onClick={runSimulation}>
                    Run Simulation
                </Button>
            </Box>
            <Dnd/>
            <If condition={isSimulationActive}>
                <WizardStart onClose={handleSimulationEnd}/>
            </If>
        </>
    );
};

export default StartScreenView;
