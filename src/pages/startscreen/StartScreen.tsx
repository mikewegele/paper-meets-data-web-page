import React from "react";
import Header from "../../layout/header/Header";
import StartScreenView from "./StartScreenView";
import Screen from "../Screen";

const StartScreen: React.FC = () => {

    return (
        <Screen>
            <Header/>
            <StartScreenView co2={5} efficiency={3} power={4} score={4}/>
        </Screen>
    );
}

export default StartScreen;