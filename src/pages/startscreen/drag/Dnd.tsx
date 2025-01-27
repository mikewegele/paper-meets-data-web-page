import React, {useCallback, useRef} from 'react';
import {
    addEdge,
    Connection,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import "./index.css"

import Sidebar from './Sidebar';
import {DnDProvider, useDnD} from './DndContext';

let id = 0;
const getId = () => `dnfdnode_${id++}`;

const Dnd: React.FC = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {screenToFlowPosition} = useReactFlow();
    const {type} = useDnD();

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => addEdge(params, eds));
    }, [setEdges]);

    //@ts-ignore
    const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
        }
    }, []);

    //@ts-ignore
    const onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        //@ts-ignore
        if (!type) {
            return;
        }
        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        //@ts-ignore
        const newNode: any = {
            id: getId(),
            position,
            data: {
                label: (
                    <img
                        src={type}
                        alt={`${type} node`}
                        style={{width: "50px", height: "50px"}}
                    />
                ),
            },
        };

        setNodes((nds) => nds.concat(newNode));
    }, [screenToFlowPosition, setNodes, type]);

    return (
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    style={{backgroundColor: "#F7F9FB"}}
                />
            </div>
            <Sidebar/>
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDProvider>
            <Dnd/>
        </DnDProvider>
    </ReactFlowProvider>
);