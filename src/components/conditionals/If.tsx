import React, {PropsWithChildren} from "react";

interface Props {
    condition: boolean
}

const If: React.FC<PropsWithChildren<Props>> = props => {

    return (
        <>
            {props.condition ? props.children : <></>}
        </>
    )
}

export default If;