import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
// import AuthService from "services/AuthService";
import AppStorage from "utils/storage";
import AuthService from "services/AuthService";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, role }) {
            const params = {
                email: user.email,
                roleCode: role
            };

            if (account.provider === 'google') {
                params.image = user.image;
                params.name = user.name;
                params.isSocial = true;
                params.social = 'google';
                params.socialId = user.id;
            }

            try {
                console.log("Params:", params)
                const res = await AuthService.Login(params);
                console.log('Result: ', res)
                if (res.status === 200 && res?.data?.data?.token) {
                    return `/app?token=${encodeURIComponent(res.data?.data?.token)}`;
                }

                return res.status === 200;
            } catch (e) {
                return false;
            }
            }
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
