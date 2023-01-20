import React, { useEffect, useRef } from "react";
import Error from "./error";
import Input from "./input";
import Loading from "./loading";
import Message, { MessageType } from "./message";
/**
 * This is a Next.js page.
 */
export default function MessageList({
  data,
  isLoading,
  isError,
  onSendMessage,
  onDelete,
  onFileAttachment
}: {
  data: MessageType[];
  isLoading: boolean;
  isError: boolean;
  onSendMessage: (body: string) => void;
  onDelete: (id: string) => void;
  onFileAttachment: (file: File) => void;
}) {
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const messagesEndRef = useRef<HTMLHeadingElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);
  
  return (
    <div className="flex flex-col dark:bg-gray-800 items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
      {isError && <Error/>}
      {isLoading && <Loading/>}
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {data && data.map((message, index) => (
            <Message
              key={message.id || `tempImage-${index}`}
              {...message}
              onDelete={onDelete}
            ></Message>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <Input disabled={isLoading || isError} onSend={onSendMessage} onFileAttachment={onFileAttachment}></Input>
      </div>
    </div>
  );
}