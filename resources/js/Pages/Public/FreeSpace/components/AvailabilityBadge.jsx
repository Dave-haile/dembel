import React from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const AvailabilityBadge = ({ status }) => {
  if (status === "available") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle size={12} className="mr-1" />
        Available
      </span>
    );
  }
  if (status === "reserved") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <Clock size={12} className="mr-1" />
        Reserved
      </span>
    );
  }
  if (status === "occupied") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle size={12} className="mr-1" />
        Occupied
      </span>
    );
  }
  return null;
};

export default AvailabilityBadge;


