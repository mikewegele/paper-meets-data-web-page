import React from "react";
import {
    BATTERY_IMAGE_URL,
    COAL_POWER_PLANT_IMAGE_URL,
    FAMILY_HOUSE_IMAGE_URL,
    NUCLEAR_ENERGY_IMAGE_URL,
    SKYSCRAPER_IMAGE_URL,
    SOLAR_PANEL_IMAGE_URL,
    WINDMILL_IMAGE_URL
} from "../../../constants/images";

import {makeStyles} from "tss-react/mui";
import SidebarElement from "./SidebarElement";

const useStyles = makeStyles()(() => ({
    aside: {
        display: "ruby",
    },
    dndNode: {
        width: "fit-content",
        height: "fit-content",
        padding: "4px",

    },
    h4Title: {
        width: "100%",
        fontSize: "1.2rem",
    },
}));

export interface DataElement {
    imageUrl: string,
    title: string
}

const Sidebar: React.FC = () => {
    const {classes} = useStyles();

    const energyProviders: DataElement[] = [
        {title: "Coal Power Plant", imageUrl: COAL_POWER_PLANT_IMAGE_URL},
        {title: "Nuclear Energy", imageUrl: NUCLEAR_ENERGY_IMAGE_URL},
        {title: "Windmill", imageUrl: WINDMILL_IMAGE_URL},
        {title: "Solar Panel", imageUrl: SOLAR_PANEL_IMAGE_URL}
    ];

    const energyStorage: DataElement[] = [
        {title: "Battery", imageUrl: BATTERY_IMAGE_URL}
    ]

    const cityBuildingBlocks: DataElement[] = [
        {title: "Family House", imageUrl: FAMILY_HOUSE_IMAGE_URL},
        {title: "Skycraper", imageUrl: SKYSCRAPER_IMAGE_URL}
    ]

    return (
        <aside className={classes.aside}>
            <SidebarElement title={"Energy Providers"} dataElements={energyProviders}/>
            <SidebarElement title={"Energy Storage"} dataElements={energyStorage}/>
            <SidebarElement title={"City Building Blocks"} dataElements={cityBuildingBlocks}/>
        </aside>
    );
};

export default Sidebar;
