import React from "react";
import {Box, CardMedia} from "@mui/material";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    box: {
        background: "white",
        padding: "3px",
        borderRadius: "8px",
        width: "100px",
        ".MuiCardMedia-root ": {
            width: "100px",
            height: "100px",
        }
    },
}));

interface Props {
    imageUrl: string;
    title?: string;
}

const SidebarImage: React.FC<Props> = props => {

    const {imageUrl, title} = props;

    const {classes} = useStyles();

    return (
        <Box className={classes.box}>
            <CardMedia
                component="img"
                image={imageUrl}
                alt={title}
            />
        </Box>
    );
}

export default SidebarImage;