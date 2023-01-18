import Input from "./input";
import Message from "./message";
/**
 * This is a Next.js page.
 */
export default function MessageList({data, onSendMessage}) {
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition

  if (!data) {
    return (
      <div style={styles}>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">

          {data.map(message => <Message key={message.id} {...message}></Message>)}
        </div>
        <Input onSend = {onSendMessage}></Input>
      </div>
    </div>
  );
}

const styles = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
