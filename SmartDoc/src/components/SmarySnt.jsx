import React from 'react';
import { HiSparkles } from "react-icons/hi";


const SmarySnt = () => {
  return (
    <div className="flex items-center text-xs text-orange-600 font-medium gap-1">
        <HiSparkles className="h-4 w-4" />
        <span>Summary sent to doctor</span>
    </div>
  )
}

export default SmarySnt
