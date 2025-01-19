import React from "react";
import {CardMedia} from "@mui/material";

interface Props {
    imageUrl: string;
    title: string;
}

const BuildingImage: React.FC<Props> = props => {

    const {imageUrl, title} = props;

    return (
        <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={title}
        />
    );
}

export default BuildingImage;