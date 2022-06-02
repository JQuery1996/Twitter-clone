import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    // Configure one or more authenication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, user, token }) {
            session.user.tag = session.user?.name
                ?.split(" ")
                .join("")
                .toLocaleLowerCase();
            session.user.uid = token.sub ?? '';
            return session;
        },
    },
    secret: process.env.JWT_SECRET,
});
