

import VerifiedStatus from "./VerifiedStatus";


export default function Contacts() {
    return (
        <section className="mt-5.5">
            <h2 className="border-b border-[#e8e8e8] pb-2 text-[14px] font-medium text-[#111]">
                Contacts
            </h2>

            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-5 px-1.5 pt-3.5 text-[11px] text-[#444]">
                <div>
                    <p className="font-medium">Phone </p>
                    <p className="mt-1.5">9876543210</p>
                </div>

                <VerifiedStatus />

                <button
                    className="text-[#168cf4]"
                    type="button"
                >
                    Change Number ?
                </button>

                <div className="col-span-3 mt-4.25 grid grid-cols-subgrid items-end">
                    <div>
                        <p className="font-medium">Email</p>

                        <div className="mt-1.5 flex items-center gap-3">
                            <span>
                                TiyaPiya@gmail.com
                            </span>
                        </div>
                    </div>

                    <VerifiedStatus />

                    <button
                        className="text-[#168cf4]"
                        type="button"
                    >
                        Change Email ?
                    </button>
                </div>
            </div>
        </section>
    );
}