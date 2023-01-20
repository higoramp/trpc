/**
 * This is a Next.js page.
 */
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import MessageList from "./components/messagelist";

export default function IndexPage() {
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const { data, isLoading, isError } = trpc.list.useQuery();
  const utils = trpc.useContext();
  const [tempFile, setTempFile] = useState<File | null>();

  const add = trpc.add.useMutation({
    onMutate: async (message) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await utils.list.cancel();
      // Snapshot the previous value
      const previousText = utils.list.getData();
      const fakeMessage = {
        id: "tempImage",
        body: message.body,
        image: tempFile ? URL.createObjectURL(tempFile) : null,
        createdAt: new Date().toString(),
      };
      // Optimistically update to the new value
      utils.list.setData(undefined, (old) =>
        old ? [...old, fakeMessage] : [fakeMessage]
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
      if (!tempFile) utils.list.invalidate();
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
    // Always refetch after error or success:
    onSettled: () => {
      utils.list.invalidate();
    },
  });

  const uploadImage = async (signedUrl: string, file: File) => {
    const myHeaders = new Headers({ "Content-Type": "image/*" });
    await fetch(signedUrl, {
      method: "PUT",
      headers: myHeaders,
      body: file,
    });
    setTempFile(null);
    utils.list.invalidate();
  };
  const sendMessage = (message: string) => {
    add.mutate({ body: message, hasImage: tempFile != null });
  };

  const attachFile = (file: File) => {
    setTempFile(file);
  };

  const deleteMessage = (id: string) => {
    del.mutate(id);
  };

  return (
    <MessageList
      data={data || []}
      isError={isError}
      isLoading={isLoading}
      onSendMessage={sendMessage}
      onDelete={deleteMessage}
      onFileAttachment={attachFile}
    />
  );
}
