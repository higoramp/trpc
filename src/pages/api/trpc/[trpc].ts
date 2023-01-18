/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { publicProcedure, router } from '~/server/trpc';
import { prisma } from '~/utils/prisma';


const appRouter = router({
  add: publicProcedure
    .input(
      z.object({
        body: z.string().min(1),
        hasImage: z.boolean().optional()
      }),
    )
    .mutation(async ({input}) => {
      await prisma.message.create({
        data: {
          body: input.body,
        }
      })
 
      return 'ok';
    }),
    delete: publicProcedure
    .input(
      z.string()
    )
    .mutation(async ({input}) => {

      await prisma.message.delete({
        where: {
          id: input
        }
      })
 
      return {ok: 'true'};
    }),
  
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away

  list: publicProcedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .query(() => {
      // This is what you're returning to your client
      return prisma.message.findMany()
    }),
  // 💡 Tip: Try adding a new procedure here and see if you can use it in the client!
  // getUser: publicProcedure.query(() => {
  //   return { id: '1', name: 'bob' };
  // }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
