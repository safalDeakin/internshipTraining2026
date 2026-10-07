import {
    EyeOff,
} from "lucide-react";

import VerifiedStatus from "./VerifiedStatus";


export default function AccountSettings() {
    return (
        <section className="mt-5.5">
            <h2 className="border-b border-[#e8e8e8] pb-2 text-[14px] font-medium text-[#111]">
                Account Settings
            </h2>

            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-5 px-1.5 pt-3.5 text-[11px] text-[#444]">
                <div>
                    <p className="font-medium">Username</p>
                    <p className="mt-1.5">Tita Piya</p>
                </div>

                <VerifiedStatus />

                <button
                    className="text-[#168cf4]"
                    type="button"
                >
                    Change Username ?
                </button>

                <div className="col-span-3 mt-4.25 grid grid-cols-subgrid items-end">
                    <div>
                        <p className="font-medium">Password</p>

                        <div className="mt-1.5 flex items-center gap-3">
                            <span>
                                *********12
                            </span>

                            <button
                                className="text-[#999]"
                                type="button"
                            >
                                <EyeOff
                                    aria-hidden="true"
                                    size={13}
                                    strokeWidth={1.5}
                                />
                            </button>
                        </div>
                    </div>

                    <VerifiedStatus />

                    <button
                        className="text-[#168cf4]"
                        type="button"
                    >
                        Change Password ?
                    </button>
                </div>
            </div>
        </section>
    );
}