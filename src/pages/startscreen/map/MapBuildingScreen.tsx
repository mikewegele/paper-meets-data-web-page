import React, {useCallback} from "react";
import {Box} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import CityCard from "../browsebuilding/CityCard";
import ConnectionLines from "../../../components/map/ConnectionLines";

const useStyles = makeStyles()(() => ({
    mapContainer: {
        position: "relative",
        width: "100%",
        height: "100%",
    },
    svgStyle: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100%",
        height: "100%",
    },
    cardContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
    }
}));

export type BuildingElementBuildingBlock = "familyHouse" | "skyscraper";
export type BuildingElementEnergyProvider = "coalPowerPlant" | "nuclearEnergy" | "windmill" | "solarPanel";
export type BuildingElementEnergyStorage = "battery";

export type BuildingElement =
    | BuildingElementBuildingBlock
    | BuildingElementEnergyProvider
    | BuildingElementEnergyStorage;

export interface DataElement {
    id: number;
    building: BuildingElement;
    nextId?: number | number[];
}

const MapBuildingScreen: React.FC = () => {
    const {classes} = useStyles();

    const data: DataElement[] = [
        {id: 1, building: "coalPowerPlant", nextId: 6},
        {id: 2, building: "nuclearEnergy", nextId: 6},
        {id: 3, building: "windmill", nextId: 6},
        {id: 4, building: "windmill", nextId: 6},
        {id: 5, building: "solarPanel", nextId: [6, 7, 8, 9]},
        {id: 6, building: "battery", nextId: [10, 11]},
        {id: 7, building: "skyscraper"},
        {id: 8, building: "skyscraper"},
        {id: 9, building: "skyscraper"},
        {id: 10, building: "familyHouse"},
        {id: 11, building: "familyHouse"},
    ];

    const getElementPosition = useCallback((id: number, nextIds?: number | number[]) => {
        const spacing = 250;
        const screenWidth = window.innerWidth;
        const maxCardsInRow = 4;
        const rowHeight = 350;
        const offset = 400;

        const numConnections = Array.isArray(nextIds) ? nextIds.length : nextIds ? 1 : 0;

        let positionX = screenWidth / 2 - spacing / 2 - offset;
        if (numConnections > 1) {
            positionX = screenWidth / 2 - (numConnections - 1) * spacing / 2 - offset;
        }

        positionX = Math.min(Math.max(positionX, 0), screenWidth - spacing);

        const row = Math.floor(id / maxCardsInRow);
        const col = id % maxCardsInRow;

        return {top: row * rowHeight, left: positionX + col * spacing};
    }, []);

    return (
        <Box className={classes.mapContainer}>
            <svg className={classes.svgStyle}>
                <ConnectionLines data={data} getElementPosition={getElementPosition}/>
            </svg>

            <Box className={classes.cardContainer}>
                {data.map((element) => {
                    const {id, building} = element;
                    const position = getElementPosition(id, element.nextId);
                    return (
                        <Box
                            key={id}
                            sx={{
                                position: "absolute",
                                top: position.top,
                                left: position.left,
                                zIndex: 2,
                            }}
                        >
                            <CityCard
                                viewType="map"
                                type={building}
                                imageUrl={`/${building}.jpg`}
                                title={building}
                                price={Math.floor(Math.random() * 1000)}
                                energyRequired={Math.floor(Math.random() * 100)}
                            />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default MapBuildingScreen;
