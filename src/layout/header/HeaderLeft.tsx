import React from "react";
import {Box, Button} from "@mui/material";
import WindIcon from "@mui/icons-material/Air";
import SunsetIcon from "@mui/icons-material/WbTwilight";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    row: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    },
    button: {
        color: "#4caf50"
    }
}));


interface Props {
    windSpeed: number;
    time: string;
}

const HeaderLeft: React.FC<Props> = (props) => {

    const {windSpeed, time} = props;

    const {classes} = useStyles();

    return (
        <Box className={classes.row}>
            <Button className={classes.button} endIcon={<WindIcon/>}>{`${windSpeed} km/h`}</Button>
            <Button className={classes.button} endIcon={<SunsetIcon/>}>{time}</Button>
        </Box>
    );
};

export default HeaderLeft;