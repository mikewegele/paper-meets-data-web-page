import React, {useMemo} from "react";
import {DataElement} from "../../pages/startscreen/map/MapBuildingScreen";

interface Props {
    data: DataElement[];
    getElementPosition: (id: number, nextIds?: (number | number[])) => { top: number, left: number };
}

const ConnectionLines: React.FC<Props> = (props) => {

    const {data, getElementPosition} = props;

    const lines = useMemo(() => {
        const result: any[] = [];
        data.forEach((element) => {
            const {id, nextId} = element;
            const currentPosition = getElementPosition(id, nextId);

            if (nextId) {
                const nextIds = Array.isArray(nextId) ? nextId : [nextId];
                nextIds.forEach((nextId) => {
                    const nextPosition = getElementPosition(nextId);

                    result.push(
                        <line
                            key={`line-${id}-${nextId}`}
                            x1={currentPosition.left + 100}
                            y1={currentPosition.top + 150}
                            x2={nextPosition.left + 100}
                            y2={nextPosition.top + 150}
                            stroke="black"
                            strokeWidth="2"
                        />
                    );
                });
            }
        });
        return result;
    }, [data, getElementPosition]);

    return <>{lines}</>;
};

export default ConnectionLines;
