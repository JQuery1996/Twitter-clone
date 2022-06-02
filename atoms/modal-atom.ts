import { atom } from "recoil";

// const [modalState, setModalState] = useState<boolean>(false)
export const modalState = atom({
    key: "modalState",
    default: false,
});

// const [postIdState, setPostIdState] = useState<string>('')
export const postIdState = atom({
    key: "postIdState",
    default: "",
});
