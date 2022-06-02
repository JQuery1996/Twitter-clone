import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession`, and received as a props on the `SessionProvider` React Context
     */

    interface Session {
        user: {
            /** the user tag  */
            tag?: string;
            uid: string;
        } & DefaultSession["user"];
    }
}
