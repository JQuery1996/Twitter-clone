import type { Timestamp } from "firebase/firestore";

export interface PostType {
    id: string;
    image?: string;
    text?: string;
    timestamp: Timestamp;
    username: string;
    userImage?: string;
    userTag: string;
}
