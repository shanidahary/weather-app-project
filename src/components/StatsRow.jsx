import { Card, CardContent, CardTitle } from "@/components/ui/card";

import React from "react";

const StatsRow = ({ stat, statName }) => {
  return (
    <Card className="w-[140px] whitespace-nowrap items-center md:w-[60px] md:h-[90px] h-[100px] p-3 bg-neutral-800 text-white text-[20px] border-none lg:min-h-[120px] xl:min-h-[150px] md:flex-1 2xl:min-h-[220px] 2xl:max-w-[350px] 2xl:px-6 2xl:gap-7 2xl:pb-4">
      <CardTitle className="font-medium md:text-[16px] lg:text-[22px] xl:text-[27px] xl:mt-2 text-white/60 2xl:text-[40px]">
        {statName}
      </CardTitle>
      <CardContent className="md:text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[45px]">
        <span>{stat}</span>
      </CardContent>
    </Card>
  );
};

export default StatsRow;
