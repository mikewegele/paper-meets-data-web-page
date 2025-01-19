import React from "react";
import {Box, Button} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    row: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    },
    button: {
        width: "15rem",
        background: "#dbdcf6",
        borderRadius: "8px",
    }
}));

interface Props {
    cityName: string;
}

const HeaderCenter: React.FC<Props> = (props) => {

    const {cityName} = props;

    const {classes} = useStyles();

    return (
        <Box className={classes.row}>
            <Button className={classes.button} startIcon={<EditOutlinedIcon/>}>{cityName || "Your City Name"}</Button>
        </Box>
    );
};

export default HeaderCenter;
