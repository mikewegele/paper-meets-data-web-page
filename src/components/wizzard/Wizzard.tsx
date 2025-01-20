import React, { PropsWithChildren, useState } from "react";
import { makeStyles } from "tss-react/mui";
import If from "../../components/conditionals/If";

const useStyles = makeStyles()(() => ({
    wizzardContainer: {
        position: "absolute",
        top: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: "99",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    wizzard: {
        height: "60vh",
        width: "70vw",
        backgroundColor: "white",
        borderRadius: "50px",
        textAlign: "center",
        color: "#4caf50",
        padding: "20px",
    }
}));

interface WizzardProps {
    closable: boolean;
    onClose: () => void;
}

const Wizzard: React.FC<PropsWithChildren<WizzardProps>> = (props) => {
    const [isClosed, setIsClosed] = useState(false);

    const { classes } = useStyles();

    const closeWizzard = () => {
        setIsClosed(true)
        props.onClose();
    };

    return !isClosed ? (
        <div className={classes.wizzardContainer}>
            <div className={classes.wizzard}>
                <If condition={props.closable}>
                    <span onClick={closeWizzard} style={{ float: "right", cursor: "pointer", color: "grey", fontSize: "2rem"}}>x</span>
                </If>
                {props.children}
            </div>
        </div>
    ) : null;
}

export default Wizzard