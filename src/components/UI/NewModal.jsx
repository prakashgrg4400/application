import React from "react";
import { createPortal } from "react-dom";

function NewModal({ children, setShowInputModal }) {
    return createPortal(
        <>
            <div
                className="modalBackdrop"
                onClick={() => {
                    setShowInputModal(false);
                }}
            ></div>
            <div className="modalContent ">
                {children}
            </div>
        </>,
        document.getElementById("modal")
    );
}

export default NewModal;
