import React, {PropsWithChildren} from "react";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    page: {
        height: "100vh",
        width: "100vw",
        backgroundColor: "#e8f5e9"
    }
}));


const Screen: React.FC<PropsWithChildren> = (props) => {

    const {classes} = useStyles();

    return (
        <div className={classes.page}>
            {props.children}
        </div>
    );
}

export default Screen