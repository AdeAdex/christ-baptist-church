//  /app/components/dashboard/DashboardCalendar.tsx


import { useState } from 'react';
import Calendar from 'react-calendar';
import "@/app/components/dashboard/DashboardCalendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DashBoardCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="w-full p-4 rounded-lg bg-white shadow-md">
      <Calendar
        onChange={onChange}
        value={value}
        className="react-calendar"
        tileClassName="custom-tile"
      />
    </div>
  );
};

export default DashBoardCalendar;
