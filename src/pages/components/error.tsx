import React from "react";
export interface MessageType {
  id?: string;
  body: string;
  image?: string | null;
  createdAt: string | null;
}

export default function Error() {
  return (
    <div role="alert" className="absolute">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Error
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>Something went wrong.</p>
      </div>
    </div>
  );
}
