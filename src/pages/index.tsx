/**
 * This is a Next.js page.
 */
import { useState } from "react";
import { trpc } from "../utils/trpc";
import MessageList from "./components/messagelist";

export default function IndexPage() {
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const result = trpc.list.useQuery();
  const utils = trpc.useContext();
  const [tempFile, setTempFile] = useState(null);

  const add = trpc.add.useMutation({
    onMutate: async (message) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await utils.list.cancel();
      // Snapshot the previous value
      const previousText = utils.list.getData();
      const fakeMessage = {
        id: "tempImage",
        body: message.body,
        image: tempFile,
        createdAt: new Date().toString(),
      };
      // Optimistically update to the new value
      utils.list.setData(undefined, (old) =>
        old ? [...old, fakeMessage] : undefined
      );

      // Return a context object with the snapshotted value
      return { previousText };
    },
    onSuccess: (data) => {
      if (tempFile) {
        uploadImage(data, tempFile);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      utils.list.invalidate();
    },
  });

  const del = trpc.delete.useMutation({
    onMutate: async (id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await utils.list.cancel();
      // Snapshot the previous value
      const previousText = utils.list.getData();

      // Optimistically update to the new value
      utils.list.setData(undefined, (old) =>
        old ? old.filter((message) => message.id != id) : undefined
      );

      // Return a context object with the snapshotted value
      return { previousText };
    },
    onSuccess: (data) => {
      console.log("Succeed remove", data);
    },
    // Always refetch after error or success:
    onSettled: () => {
      utils.list.invalidate();
    },
  });

  const uploadImage = async (signedUrl: string, file: any) => {
    try {
      const myHeaders = new Headers({ "Content-Type": "image/*" });
      await fetch(signedUrl, {
        method: "PUT",
        headers: myHeaders,
        body: file,
      });
      setTempFile(null);
      utils.list.refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = (message: { body: string }) => {
    add.mutate({ body: message.body, hasImage: tempFile != null });
  };

  const attachFile = (file: any) => {
    console.log("MESSAGE HAS FILE", file);
    setTempFile(file);
  };

  const deleteMessage = (id: string) => {
    console.log("ID", id);
    del.mutate(id);
  };

  if (!result.data) {
    return (
      <div >
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <MessageList
      data={result.data}
      onSendMessage={sendMessage}
      onDelete={deleteMessage}
      onFileAttachment={attachFile}
    />
  );
}
