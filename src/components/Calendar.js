
import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";


const dummyData = {
  "01-09-2025": [
    { user: "user_1", value: 1 },
    { user: "user_2", value: 2 },
  ],
  "02-09-2025": [
    { user: "user_1", value: 3 },
    { user: "user_2", value: 4 },
  ],
};

Modal.setAppElement("#root");
const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [dateData, setDateData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);


  const events = Object.keys(dummyData).map((dateStr) => {
    const [day, month, year] = dateStr.split("-");
    const start = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return { title: `${dummyData[dateStr].length} items`, start, end: start };
  });

  
  const handleSelectSlot = ({ start }) => {
    const dateKey = moment(start).format("DD-MM-YYYY");
    const dataForDate = dummyData[dateKey] || [];

    if (dataForDate.length === 0) {
      alert("No data found for the selected date.");
      return;
    }

    setSelectedDate(dateKey);
    setDateData(dataForDate);
    setModalOpen(true);
  };

  
  const dayPropGetter = (date) => {
    const dateKey = moment(date).format("DD-MM-YYYY");

    if (dateKey === selectedDate) {
      return {
        style: {
          backgroundColor: "#ffeeba",
          border: "2px solid #ff9800",
          borderRadius: "6px",
        },
      };
    }

    if (dummyData[dateKey]) {
      return {
        style: {
          backgroundColor: "#d4edda",
          borderRadius: "6px",
        },
      };
    }

    return {};
  };

  return (
    <div style={{ height: "700px", margin: "20px" }}>
      <BigCalendar
        localizer={localizer}
        selectable
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        dayPropGetter={dayPropGetter}
      />

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          content: { width: "450px", margin: "auto", textAlign: "center", borderRadius: "10px" },
          overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
        }}
      >
        <h2>Data for {selectedDate}</h2>
        <BarChart width={400} height={300} data={dateData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="user" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>

        <button onClick={() => setModalOpen(false)} style={{ marginTop: "10px" }}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Calendar;


