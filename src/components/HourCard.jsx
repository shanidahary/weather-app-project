import React from "react";
import { Card, CardContent } from "@/components/ui/card";

function HourCard({ hour, icon, temp, tempUnit, convertTemp }) {
  return (
    <Card className="bg-neutral-700 text-white border-none shadow-none rounded-2xl h-[60px] lg:h-[63px] xl:h-[75px] lg:justify-center 2xl:h-[110px]">
      <CardContent className="flex justify-between items-center text-[18px] xl:text-[25px] px-3 py-2 h-[25px] 2xl:text-[42px] 2xl:px-7 2xl:py-4">
        <div className="flex gap-2 items-center 2xl:gap-8">
          <span className="inline-flex scale-100 2xl:scale-150">{icon}</span>
          <span>{hour}</span>
        </div>
        <span className="pr-3">{`${Math.round(
          convertTemp(temp)
        )}${tempUnit}`}</span>
      </CardContent>
    </Card>
  );
}

export default HourCard;
