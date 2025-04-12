//  /app/components/dashboard/DashboardCalendar.tsx


import { useState } from 'react';
import Calendar from 'react-calendar';
import "@/app/components/dashboard/DashboardCalendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DashBoardCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="w-full rounded-lg dark:bg-gray-700 shadow-md">
      <Calendar
        onChange={onChange}
        value={value}
        className="react-calendar dark:bg-gray-700"
        tileClassName="custom-tile"
      />
    </div>
  );
};

export default DashBoardCalendar;
