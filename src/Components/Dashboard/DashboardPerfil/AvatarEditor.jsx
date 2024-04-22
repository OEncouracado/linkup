// eslint-disable-next-line
import React, { useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
// eslint-disable-next-line
import { Form } from 'react-bootstrap';

const MyEditor = ({ perfil }) => {
    // const [zoom, setZoom] = useState('1');
    // const [rotate, setRotate] = useState('0');

    return (<>
        <AvatarEditor
        className='AvatarEditorCss mt-2'
            image={perfil}
            width={250}
            height={250}
            border={50}
            color={[0, 0, 0, 0.6]} // RGBA
            scale={1}
            rotate={0}
        />
    </>
    )
}

export default MyEditor


// <Form.Group className='p-1 d-flex border my-2'>
//             <Form.Label className='perfilImgZoomRangeLabel m-0'>Zoom ({zoom}X):</Form.Label>
//             <Form.Range
//                 className='perfilImgZoomRange w-75 ms-2'
//                 step={0.01}
//                 defaultValue={1.0}
//                 min={1.0}
//                 max={4}
//                 onChange={e => (setZoom(e.target.value))} />
//         </Form.Group>
//         <Form.Group className='p-1 d-flex border my-2'>
//             <Form.Label className='perfilImgZoomRangeLabel m-0'>Ângulo ({rotate}º):</Form.Label>
//             <Form.Range
//                 className='perfilImgZoomRange w-75 ms-2'
//                 step={0.1}
//                 defaultValue={0}
//                 min={0}
//                 max={180}
//                 onChange={e => (setRotate(e.target.value))} />
//         </Form.Group>
