import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import BuildingImage from "../../../components/building/BuildingImage";
import If from "../../../components/conditionals/If";
import {BuildingElement} from "../map/MapBuildingScreen";

interface Props {
    type: BuildingElement;
    imageUrl: string;
    title?: string;
    price?: number;
    energyRequired?: number;
    viewType: "map" | "browse";
}

const CityCard: React.FC<Props> = (props) => {

    const {type, viewType, imageUrl, title, price, energyRequired} = props;

    return (
        <Card sx={{width: 200, height: 300, borderRadius: 2, boxShadow: 2}}>
            <BuildingImage imageUrl={imageUrl} title={title}/>
            <If condition={viewType === "browse"}>
                <CardContent>
                    <Typography variant="h6">{title}</Typography>
                    <Typography>€{price}</Typography>
                    <Typography>Requires {energyRequired} kWh</Typography>
                </CardContent>
            </If>
        </Card>
    );
};

export default CityCard;
