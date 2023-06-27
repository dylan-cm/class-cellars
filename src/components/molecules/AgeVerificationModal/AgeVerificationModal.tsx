import React, { useEffect, useState } from "react";
import "./AgeVerificationModal.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as WineStainDark } from "../../../assets/wine_stain_dark.svg";
import { ReactComponent as WineStainLight } from "../../../assets/wine_stains.svg";

const AgeVerificationModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ageVerified = localStorage.getItem("ageVerified");

    if (!ageVerified || ageVerified === "false") {
      setModalIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("ageVerified", "true");
    setModalIsOpen(false);
  };

  const handleDeny = () => {
    navigate(-1);
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    if (!localStorage.getItem("ageVerified")) return;
    setModalIsOpen(false);
  };

  return (
    <div
      className={`Modal ${modalIsOpen ? "" : "Hidden"}`}
      onClick={handleClose}
    >
      <div className="WineStainDark">
        <WineStainDark />
      </div>
      <div className="ModalContent">
        <div className="WineStainLight">
          <WineStainLight />
        </div>
        <h2>Welcome to Classified Cellars</h2>
        <p>Are you 21 or older?</p>
        <div className="Row">
          <button className="ModalButton No" onClick={handleDeny}>
            No
          </button>
          <button className="ModalButton Yes" onClick={handleConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
