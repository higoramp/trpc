import React from "react";
export interface MessageType {
  id?: string;
  body: string;
  image?: string | null;
  createdAt: string | null;
}

export default function Loading() {
  return (
    <div
      role="status"
      className="absolute  opacity-100 -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
    >
      <img
        src="/assets/loading.svg"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
