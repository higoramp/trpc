import React, { ChangeEvent, useState } from "react";
/**
 * This is a Next.js page.
 */
export default function Input(props: { disabled?: boolean, onSend: (body: string) => void, onFileAttachment: (file: File) => void }) {
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setInput(e.target.value);

  const sendInput = () => {
    if (props.onSend && input.length > 0) {
      props.onSend(input);
    }
    setInput("");
    setImage(undefined)
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      setImage(URL.createObjectURL(e.target.files[0]));
      if(props.onFileAttachment) {
        props.onFileAttachment(e.target.files[0])
      }
    }
  };

  return (
    <div className="relative flex">
      <input
        type="text"
        disabled={props.disabled}
        onChange={handleChange}
        onKeyPress={(e) => (e.key === "Enter" ? sendInput() : undefined)}
        value={input}
        placeholder="Write your message!"
        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-md py-3"
      />
      <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
        {image && <img src={image} style={{ width: 40, height: 40 }}></img>}
        <label className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
        <img className="h-6 w-6 text-gray-600" src='/assets/image.svg'/>
          <input
            type="file"
            onChange={selectFile}
            accept="image/*"
            style={{ display: "none" }}
          />
        </label>

        <button
          disabled={props.disabled || input.length === 0}
          type="button"
          onClick={sendInput}
          className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
        >
          <span className="font-bold">Send</span>
          <img className="h-6 w-6 ml-2 transform rotate-90" src='/assets/send.svg'/>
        </button>
      </div>
    </div>
  );
}
