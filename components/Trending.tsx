/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { TrendingType } from "types/TrendingType.type";
import Image from "next/image";
import { DotsHorizontalIcon } from "@heroicons/react/outline";

export function Trending({ result }: { result: TrendingType }) {
    return (
        <div
            className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer 
			transition duration-200 ease-out flex items-center justify-between"
        >
            <div className="space-y-0.5 mr-1">
                <p className="text-[#6e767d] text-xs font-medium">
                    {result.heading}
                </p>

                <h6 className="font-bold max-w-[250px] text-sm">
                    {result.description}
                </h6>
                <p className="text-[#6e767d] text-xs font-medium max-w-[250px]">
                    Trending with:{" "}
                    {result.tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </p>
            </div>
            {result.img ? (
                <Image
                    src={result.img}
                    width={70}
                    height={70}
                    objectFit="cover"
                    className="rounded-2xl"
                    alt=""
                />
            ) : (
                <div className="icon group">
                    <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                </div>
            )}
        </div>
    );
}
