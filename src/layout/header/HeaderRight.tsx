import React from "react";
import {Box, Chip, Typography} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import PeopleIcon from "@mui/icons-material/People";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    section: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "center",
    },
    chip: {
        width: "12rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .MuiChip-label": {
            width: "100%",
        },
    },
    label: {
        flexGrow: 1,
        textAlign: "center",
    },
    box: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    euroIcon: {
        color: "gray",
    },
    peopleIcon: {
        color: "#4caf50",
    },
}));

interface Props {
    money: string;
    population: number;
}

const HeaderRight: React.FC<Props> = (props) => {
    const {money, population} = props;

    const {classes} = useStyles();

    return (
        <Box className={classes.section}>
            <Chip
                className={classes.chip}
                label={
                    <Box className={classes.box}>
                        <Typography className={classes.label}>{money}</Typography>
                        <EuroIcon className={classes.euroIcon}/>
                    </Box>
                }
            />
            <Chip
                className={classes.chip}
                label={
                    <Box className={classes.box}>
                        <Typography className={classes.label}>{population}</Typography>
                        <PeopleIcon className={classes.peopleIcon}/>
                    </Box>
                }
            />
        </Box>
    );
};

export default HeaderRight;
