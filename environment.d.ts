declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            JWT_SECRET: string;
            // [key: string]: string | undefined;
        }
    }
}

export {};
