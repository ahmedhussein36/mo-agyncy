"use client";
import React, { useRef } from "react";

const Loading = () => {
    // const loadingRef = useRef<HTMLDivElement>(null);

    return (
        <div className=" relative flex rounded-full justify-center items-center h-[calc(100vh-11rem)] ">
            <div className="flex justify-center mt-8">
                <div
                    className="w-10 h-10 border-4 border-cyan-500/50 border-t-cyan-600 border-r-cyan-400 rounded-full
                 duration-700 transition-all ease-in
                 animate-spin"
                ></div>
            </div>
        </div>
    );
};

export default Loading;
