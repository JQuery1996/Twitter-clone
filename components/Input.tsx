/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from "react";
import {
    XIcon,
    PhotographIcon,
    EmojiHappyIcon,
    ChartBarIcon,
    CalendarIcon,
} from "@heroicons/react/outline";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { db, storage } from "firebase.config";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react";

export function Input() {
    const [input, setInput] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [showEmojis, setShowEmojis] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const filePickerReference = useRef<HTMLInputElement>(
        {} as HTMLInputElement,
    );

    const { data: session } = useSession();

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setInput(event.target.value);
    }

    function clearSelectedFile() {
        setSelectedFile(null);
    }

    function addImageToPost(event: React.ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader();
        const file = event.target.files?.[0];
        if (file) {
            reader.readAsDataURL(file);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target?.result as string);
        };
    }

    function openInputFile() {
        filePickerReference.current.click();
    }
    function handleShowEmojis() {
        setShowEmojis((showEmojis) => !showEmojis);
    }
    function addEmoji(e: any) {
        // const sym = e.unified.split("-");
        // const codesArray: any[] = [];
        // sym.forEach((el: any) => codesArray.push("0x" + el));
        // const emoji = String.fromCodePoint(...codesArray);
        // setInput((input) => input + emoji);
        setInput((input) => input + e.native);
    }

    async function sendPost() {
        if (loading) return;
        setLoading(true);

        const documentReference = await addDoc(collection(db, "posts"), {
            id: session!.user.uid,
            username: session!.user.name,
            userImage: session!.user.image,
            userTag: session!.user.tag,
            text: input,
            timestamp: serverTimestamp(),
        });

        const imageReference = ref(
            storage,
            `posts/${documentReference.id}/image`,
        );

        if (selectedFile)
            await uploadString(imageReference, selectedFile, "data_url").then(
                async () => {
                    const downloadUrl = await getDownloadURL(imageReference);
                    await updateDoc(doc(db, "posts", documentReference.id), {
                        image: downloadUrl,
                    });
                },
            );

        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);
    }
    return (
        <div
            className={`border-b border-gray-700 p-3 flex space-x-3  overflow-hidden ${
                loading && "opacity-60"
            }`}
        >
            <img
                src={session!.user.image!}
                alt="Authentication Avatar"
                className="h-11 w-11 rounded-full xl:mr-2.5 cursor-pointer"
            />
            <div className="w-full divide-y divide-gray-700">
                <div
                    className={`${selectedFile && "pb-7"} ${
                        input && "space-y-2.5"
                    }`}
                >
                    <textarea
                        className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
                        placeholder="What's happening"
                        rows={2}
                        value={input}
                        onChange={handleChange}
                    />

                    {selectedFile && (
                        <div className="relative">
                            <div
                                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26]
                             bg-opacity-75 rounder-full flex items-center justify-center top-1 left-1 cursor-pointer"
                                onClick={clearSelectedFile}
                            >
                                <XIcon className="text-white h-5" />
                            </div>
                            <img
                                src={selectedFile}
                                alt=""
                                className="rounded-2xl max-h-80 object-contain"
                            />
                        </div>
                    )}
                </div>

                {!loading && (
                    <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                            <div className="icon" onClick={openInputFile}>
                                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                                <input
                                    type="file"
                                    hidden
                                    onChange={addImageToPost}
                                    ref={filePickerReference}
                                />
                            </div>
                            <div className="icon rotate-90">
                                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                            </div>
                            <div className="icon" onClick={handleShowEmojis}>
                                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                            </div>
                            <div className="icon">
                                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                            </div>
                            {showEmojis && (
                                <Picker
                                    onSelect={addEmoji}
                                    style={{
                                        position: "absolute",
                                        marginTop: 465,
                                        marginLeft: -40,
                                        maxWidth: 320,
                                        borderRadius: 20,
                                    }}
                                    theme="dark"
                                />
                            )}
                        </div>

                        <button
                            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold
                        shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 
                        disabled:cursor-default"
                            disabled={!input.trim() && !selectedFile}
                            onClick={sendPost}
                        >
                            Tweet
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
