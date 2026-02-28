"use client";

import "./Loader.css";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="loader">
                <div className="box box-1">
                    <div className="side-left"></div>
                    <div className="side-right"></div>
                    <div className="side-top"></div>
                </div>
                <div className="box box-2">
                    <div className="side-left"></div>
                    <div className="side-right"></div>
                    <div className="side-top"></div>
                </div>
                <div className="box box-3">
                    <div className="side-left"></div>
                    <div className="side-right"></div>
                    <div className="side-top"></div>
                </div>
                <div className="box box-4">
                    <div className="side-left"></div>
                    <div className="side-right"></div>
                    <div className="side-top"></div>
                </div>
            </div>
        </div>
    );
}
