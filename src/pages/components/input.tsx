import { ChangeEvent, useState } from "react";
/**
 * This is a Next.js page.
 */
export default function Input(props) {
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const [input, setInput] = useState("");
  const [image, setImage] = useState<{ url: string; file: any } | undefined>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setInput(e.target.value);

  const sendInput = () => {
    console.log(input);
    if (props.onSend) {
      props.onSend({ body: input, image });
    }
    setInput("");
  };

  const selectFile = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      setImage({
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
    }
    console.log(e.target.files);
  };

  return (
    <div className="relative flex">
      <input
        type="text"
        onChange={handleChange}
        onKeyPress={(e) => (e.key === "Enter" ? sendInput() : undefined)}
        value={input}
        placeholder="Write your message!"
        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-md py-3"
      />
      <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
        {image && <img src={image.url} style={{ width: 40, height: 40 }}></img>}
        <label className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
          <input
            type="file"
            onChange={selectFile}
            accept="image/*"
            style={{ display: "none" }}
          />
        </label>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          onClick={sendInput}
          className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
        >
          <span className="font-bold">Send</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6 ml-2 transform rotate-90"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
