import { Timestamp } from "firebase/firestore";

export interface CommentType {
    comment: string;
    username: string;
    userTag: string;
    userImage?: string;
    timestamp: Timestamp;
}
