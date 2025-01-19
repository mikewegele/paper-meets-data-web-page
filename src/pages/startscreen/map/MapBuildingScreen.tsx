import React from "react";
import {Box} from "@mui/material";
import CityCard from "../browsebuilding/CityCard";

export type BuildingElementBuildingBlock = "familyHouse" | "skyscraper";
export type BuildingElementEnergyProvider = "coalPowerPlant" | "nuclearEnergy" | "windmill" | "solarPanel";
export type BuildingElementEnergyStorage = "battery";

export type BuildingElement =
    | BuildingElementBuildingBlock
    | BuildingElementEnergyProvider
    | BuildingElementEnergyStorage;

interface Element {
    id: number;
    building: BuildingElement;
    nextId?: number | number[];
}

const data: Element[] = [
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

interface MapBuildingScreenProps {
}

const MapBuildingScreen: React.FC<MapBuildingScreenProps> = () => {
    const getElementPosition = (id: number, nextIds?: number | number[]) => {
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
    };

    const renderConnections = () => {
        const lines: any[] = [];
        data.forEach((element) => {
            const {id, nextId} = element;
            const currentPosition = getElementPosition(id, nextId);

            if (nextId) {
                const nextIds = Array.isArray(nextId) ? nextId : [nextId];
                nextIds.forEach((nextId) => {
                    const nextPosition = getElementPosition(nextId);

                    lines.push(
                        <line
                            key={`line-${id}-${nextId}`}
                            x1={currentPosition.left + 100}
                            y1={currentPosition.top + 150}
                            x2={nextPosition.left + 100}
                            y2={nextPosition.top + 150}
                            stroke="black"
                            strokeWidth="2"
                        />
                    );
                });
            }
        });

        return lines;
    };

    return (
        <Box sx={{position: "relative", width: "100%", height: "100%"}}>
            <svg
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                }}
            >
                {renderConnections()}
            </svg>

            <Box sx={{position: "absolute", top: 0, left: 0, zIndex: 2}}>
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
