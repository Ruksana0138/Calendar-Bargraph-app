import React from "react";
import Modal from "react-modal";
import DataBarChart from "./BarChart";

Modal.setAppElement("#root");

const DataModal = ({ isOpen, onClose, selectedDate, data }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
      <h2>Data for {selectedDate}</h2>
      {data && data.length > 0 ? (
        <DataBarChart data={data} />
      ) : (
        <p style={{ color: "red" }}>No data found for the selected date.</p>
      )}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default DataModal;
