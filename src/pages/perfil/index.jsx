import React from "react";
import "./style.css";
import { useAuth } from "../../hook";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <i
        className="iconShowEditUsername fa fa-arrow-left m-2"
        aria-hidden="true"
        title="Voltar"
        onClick={() => navigate(-1)}
      ></i>
      <div className="container rounded bg-dark text-light mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                alt=""
                src={authUser?.photoURL}
              />
              <span>
                <i class="fa fa-pencil me-3 editIcon" aria-hidden="true" />{" "}
                <i class="fa fa-trash deleteIcon" aria-hidden="true" />
              </span>
              <span className="font-weight-bold">{authUser?.displayName}</span>
              <span className="text-white-50">{authUser?.email}</span>
            </div>
          </div>
          <div className="col-md-7 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Perfil de Usuário</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="labels">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nome"
                    value={authUser?.displayName}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Número</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="(00) 9 0000-0000"
                    value={authUser?.phoneNumber}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">E-mail</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    placeholder="enter email id"
                    title="Não é possivel alterar o E-mail"
                    value={authUser?.email}
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
