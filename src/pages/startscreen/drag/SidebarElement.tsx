import React from "react";

import {makeStyles} from "tss-react/mui";
import {Typography} from "@mui/material";
import SidebarImage from "./SidebarImage";
import {useDnD} from "./DndContext";
import {DataElement} from "./Sidebar";

const useStyles = makeStyles()(() => ({
    aside: {
        display: "ruby",
    },
    dndNode: {
        width: "fit-content",
        height: "fit-content",
        padding: "4px",

    },
    h4Title: {
        width: "100%",
        fontSize: "1.2rem",
    },
}));


interface Props {
    title: string
    dataElements: DataElement[]
}

const SidebarElement: React.FC<Props> = props => {

    const {title, dataElements} = props;

    const {classes} = useStyles()

    const {setType} = useDnD();

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, imageURL: string) => {
        if (setType) {
            setType(imageURL);
        }
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <>
            <Typography className={classes.h4Title} variant={"h4"}>{title}</Typography>
            {dataElements.map(dataElement => {
                return (
                    <div
                        className={classes.dndNode}
                        onDragStart={(event) => onDragStart(event, dataElement.imageUrl)}
                        draggable
                    >
                        <SidebarImage
                            imageUrl={dataElement.imageUrl}
                            title={dataElement.title}
                        />
                    </div>
                )
            })}
        </>
    );
}

export default SidebarElement;