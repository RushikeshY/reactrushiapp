import { useState } from "react";
import ImageHolder from "./ImageHolder";

export default function MyReturn() {
    return (
        <div>
            <div className="m-4 text-[1.5rem] font-semibold">My Returns</div>
            <div className="grow m-4">
                <div>
                    {[...Array(4).keys()].map((i) => {
                        return <ProductCard status={true} key={i} />;
                    })}
                </div>
            </div>
        </div>
    );
}

function ProductCard({ status }) {
    return (
        <div className="grow mb-4 border-2 rounded-xl">
            <div className="flex flex-row text-sm justify-between p-3 px-5">
                <div className="text-gray-1300">Order ID - <span className="text-black font-bold">#3214321</span></div>
                <div className="text-gray-1300">Order Date - <span className="text-black font-bold">10/03/2023</span></div>
                <div className="text-[#FD2E35]">Returned date - <span className="font-bold">14/03/2023</span></div>
            </div>
            <div className="h-0.5 bg-gray-800" ></div>

            <div>
                <div className="p-4 md:p-6 flex flex-row justify-between gap-5">
                    <ImageHolder className="w-[8rem] md:w-[12rem] h-[9rem]" />
                    <div className="text-xs md:text-lg">
                        <div className="font-bold ">Women Multicolor Handbag - Extra Spacious</div>
                        <div className="hidden text-base my-2 md:block">Handmade, durable and easy washable bag. With Pure cotton black. Few more words about that product in a line.</div>
                        <div className="md:hidden my-2 text-xs">{("Handmade, durable and easy washable bag. With Pure cotton black. Few more words about that product in a line.").substring(0, 50)}...</div>
                        <div className="self-end flex text-xs md:text-base flex-row items-center font-bold">
                            <span className=" font-bold mr-2">Price:</span>
                            <span className="mr-[0.5rem]">${100}</span>
                        </div>

                    </div>
                    <div className="hidden sm:block md:ml-15">
                        {
                            status ? <div className="font-bold flex mb-2">
                                <div className="bg-[#0DB700] blur-[4px] w-4 h-4 rounded-full mt-1 mr-2" ></div>
                                <div className="text-xs md:text-base">Refund Is Completed</div>
                            </div> : <div className="font-bold flex mb-2">
                                <div className="bg-[#EAD300] blur-[3px] w-4 h-4 rounded-full mt-1 mr-2" ></div>
                                <div className="text-xs md:text-base">Refund Is Pending</div>
                            </div>
                        }
                        <div className="text-xs">You Returned this product because of the quality issue.</div>
                    </div>
                </div>
            </div>
            <div className="h-0.5 bg-gray-800" ></div>
            {
                status ? <div className="flex flex-row text-xs md:text-base p-3 px-5">
                    <div className="text-[#0DB700] font-bold mx-1 md:mx-10">Refund Is Completed</div>
                    <div>( <span className="text-[gray]">Refund ID - </span> <span>10205875964232013258</span> )</div>
                </div> : <div className="flex flex-row text-xs md:text-base p-3 px-5">
                    <div className="text-[#EBD50A] font-bold mx-4 md:mx-10">Refund Pending</div>
                    <div>( <span className="text-[gray]">Refund ID - </span> <span>10205875964232013258</span> )</div>
                </div>

            }
        </div>
    )
}