"use client";

export function BackButton() {
    return <button className="GoBackbutton" onClick={() => history.back()}>Go back</button>
}