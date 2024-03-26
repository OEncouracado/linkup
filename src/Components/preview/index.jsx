import React from 'react';
// import Perfil from './Perfil'; // Import Perfil component
// import Moldura from './Moldura'; // Import Moldura component

function Preview() {
  return (
    <div className='previewFundo bg-primary'>
      {/* <div className='previewTela bg-danger d-flex justify-content-center align-items-center'>
        <div className='previewTela d-flex bg-warning justify-content-center align-items-start'>
          <img className='previewSmartPhone' src={require("../../Images/smartphone.png")} alt="" srcset="" />
          <div className='previewPerfilTop d-flex flex-column justify-content-center align-items-center'>
            <div className='previewframeepefilwarp d-flex flex-column justify-content-center align-items-center'>
              {selectedFrame && <Moldura src={selectedFrame.src} nome={selectedFrame.nome} className='previewMolduraPerfil' />}
              <Perfil level={level} selectedFrame={selectedFrame} /> //Use Perfil component here
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Preview;

