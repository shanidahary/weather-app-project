import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useState } from "react";

function DaysSelector({ weatherDay, setSelectedDay }) {
  const [currrentDay, setCurrentDay] = useState(weatherDay);

  const handleChange = (value) => {
    setCurrentDay(value);
    setSelectedDay(value);
  };

  const getWeekDaysFrom = (startDay) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const startIndex = days.indexOf(startDay);
    // Rotate array so it starts from today
    return [...days.slice(startIndex), ...days.slice(0, startIndex)];
  };

  const weekDays = getWeekDaysFrom(weatherDay);

  return (
    <Select value={currrentDay} onValueChange={handleChange}>
      <SelectTrigger
        className="
  w-[110px]
  h-[60px]
  text-white
  text-[14px]
  bg-neutral-700
  rounded-md
  border border-neutral-600
  px-3
  lg:text-[16px]
  lg:w-[140px]
  xl:text-[20px]
  xl:w-[160px]
  2xl:text-[35px]
  2xl:w-[240px]
  2xl:min-h-[85px]
"
      >
        {" "}
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {weekDays.map((day) => (
          <SelectItem className="text-[40px]" key={day} value={day}>
            {day}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DaysSelector;
