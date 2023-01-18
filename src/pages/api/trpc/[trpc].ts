/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { publicProcedure, router } from "~/server/trpc";
import { prisma } from "~/utils/prisma";
import { getUploadImageUrl } from "~/utils/imageuploader";

const appRouter = router({
  add: publicProcedure
    .input(
      z.object({
        body: z.string().min(1),
        hasImage: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      let image;
      let signedUrlImage;
      if (input.hasImage) {
        const { url, signedUrl } = await getUploadImageUrl();
        image = url;
        signedUrlImage = signedUrl;
      }

      await prisma.message.create({
        data: {
          body: input.body,
          image,
        },
      });

      return input.hasImage ? signedUrlImage : "ok";
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
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
