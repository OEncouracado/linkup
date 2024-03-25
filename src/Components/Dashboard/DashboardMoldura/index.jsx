// src/Components/Dashboard/DashboardMoldura/index.jsx
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function DashboardMoldura({ frames, handleSelectFrame }) {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props.title}
        </Tooltip>
    );

    return (

        <div className='d-flex justify-content-center align-items-center mt-5 mb-2'>
            {frames?.map(frame => (
                <OverlayTrigger placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ title: frame.nome })} ><img
                    key={frame.id}
                    src={frame.src}
                        alt={`moldura ${frame.nome}`}
                    className='mx-2 frameOption'
                        onClick={() => {
                            console.log("Frame selecionado:", frame.src);
                            handleSelectFrame(frame);
                        }}
                    /></OverlayTrigger>
            ))}
        </div>
    );
}

export default DashboardMoldura;
