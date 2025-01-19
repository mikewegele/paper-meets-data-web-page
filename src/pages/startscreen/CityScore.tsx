import React, {useState} from "react";
import {Box, ToggleButton, Typography} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "#e8f5e9"
    },
    card: {
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "400px",
    },
    title: {
        color: "#4caf50",
        fontSize: "2rem",
        marginBottom: "1rem",
    },
    stars: {
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "1rem",
    },
    expandedContent: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "1rem",
    },
    category: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
    },
    categoryText: {
        flex: "1",
        textAlign: "left",
    },
}));

interface Props {
    score: number; // Number of filled stars (0-5)
    co2: number;
    power: number;
    efficiency: number;
}

const CityScore: React.FC<Props> = props => {

    const {score, co2, power, efficiency} = props;

    const {classes} = useStyles();
    const [expanded, setExpanded] = useState(false);

    const renderStars = (filledStars: number) => {
        return Array.from({length: 5}).map((_, index) =>
            index < filledStars ? (
                <StarIcon key={index} style={{color: "gold"}}/>
            ) : (
                <StarBorderIcon key={index} style={{color: "lightgray"}}/>
            )
        );
    };

    return (
        <Box className={classes.container}>
            <Box className={classes.card}>
                <Typography className={classes.title}>City Score</Typography>
                <Box className={classes.stars}>{renderStars(score)}</Box>
                <ToggleButton
                    value="toggle"
                    selected={expanded}
                    onChange={() => setExpanded((prev) => !prev)}
                >
                    {expanded ? "Hide Full Ranking" : "See Full Ranking"}
                </ToggleButton>
                {expanded && (
                    <Box className={classes.expandedContent}>
                        <Box className={classes.category}>
                            <Typography className={classes.categoryText}>CO2</Typography>
                            <Box className={classes.stars}>{renderStars(co2)}</Box>
                        </Box>
                        <Box className={classes.category}>
                            <Typography className={classes.categoryText}>Power Coverage</Typography>
                            <Box className={classes.stars}>{renderStars(power)}</Box>
                        </Box>
                        <Box className={classes.category}>
                            <Typography className={classes.categoryText}>Efficiency</Typography>
                            <Box className={classes.stars}>{renderStars(efficiency)}</Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default CityScore;