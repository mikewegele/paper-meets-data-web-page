import {IconButton} from "@mui/material";
import React, {PropsWithChildren, useCallback, useState} from "react";
import {makeStyles} from "tss-react/mui";
import If from "../../components/conditionals/If";
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles()(() => ({
    closeButton: {
        float: "right",
        color: "grey",
    },
    wizardContainer: {
        position: "fixed",
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
    wizard: {
        minHeight: "50vh",
        width: "70vw",
        backgroundColor: "white",
        borderRadius: "50px",
        textAlign: "center",
        color: "#4caf50",
        padding: "20px",
        position: "relative",
    }
}));

interface Props {
    closable: boolean;
    onClose: () => void;
}

const Wizard: React.FC<PropsWithChildren<Props>> = (props) => {

    const [isClosed, setIsClosed] = useState(false);

    const {classes} = useStyles();

    const closeWizard = useCallback(() => {
        setIsClosed(true)
        props.onClose();
    }, [props]);

    return (
        <If condition={!isClosed}>
            <div className={classes.wizardContainer}>
                <div className={classes.wizard}>
                    {props.closable && (
                        <IconButton
                            className={classes.closeButton}
                            onClick={closeWizard}>
                            <CloseIcon/>
                        </IconButton>
                    )}
                    {props.children}
                </div>
            </div>
        </If>
    )

}

export default Wizard