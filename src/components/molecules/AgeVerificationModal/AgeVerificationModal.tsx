import React, { useEffect, useState } from "react";
import "./AgeVerificationModal.css";
import { useNavigate } from "react-router-dom";

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
      <div className="ModalContent">
        <h2>Age Verification</h2>
        <p>Are you 18 or older?</p>
        <div className="Row">
          <button className="ModalButton" onClick={handleConfirm}>
            Yes
          </button>
          <button className="ModalButton" onClick={handleDeny}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
