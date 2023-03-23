import React from 'react'
import "./style.css"
import socials from "../../Images/msociais.jpg"

function PrimDiv() {
  return (
    <div className="primeiraDiv d-flex flex-column align-items-center p-3 mt-3"> 
        <h1 className="mb-0 titulo">LinkUp</h1>
        <h6 className="mt-0">teste de subtitulo</h6>
        <div className="msociais flex-row d-flex mt-4">
            <div className="flex-column msocias col-5 d-flex">
                <img className="msociaisImg" src={socials} alt="" srcset="" />
            </div>
            <div className="flex-column msocias col-7 d-flex">
                <span style={{fontSize:"1.6em"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi ab qui vero illo reiciendis provident reprehenderit dignissimos amet inventore est voluptatibus eligendi, aut consequatur accusantium ipsum accusamus culpa aliquam similique?</span>
            </div>
        </div>
    </div>
  )
}

export default PrimDiv