"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function TopLoader() {
    return (
        <ProgressBar
            height="2px"
            color="#0A2FFF"
            options={{ showSpinner: false }}
            spinnerPosition="top-right"
            style={"z-index: 9999999; top: 0; left: 0; right: 0; position: fixed;"}
            disableStyle={false}
        />
    );
}
