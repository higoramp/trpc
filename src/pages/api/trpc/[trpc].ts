/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { publicProcedure, router } from "~/server/trpc";
import { prisma } from "~/utils/prisma";
import { getUploadImageUrl, deleteImage } from "~/utils/imageuploader";
import { Message } from "@prisma/client";

const appRouter = router({
  add: publicProcedure
    .input(
      z.object({
        body: z.string().min(1),
        hasImage: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const data = <Message> { body: input.body }

      if (!input.hasImage) {
        await prisma.message.create({data});
        return "ok"
      } else {
        const { url, signedUrl } = await getUploadImageUrl();
        data.image = url
        await prisma.message.create({data});
        return signedUrl
      }
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const message = await prisma.message.findFirst({
      where: {
        id: input
      }
    })

    if(message?.image) {
      deleteImage(message.image)
    }

    await prisma.message.delete({
      where: {
        id: input,
      },
    });

    return { ok: "true" };
  }),

  list: publicProcedure.query(() => {
    return prisma.message.findMany();
  }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
