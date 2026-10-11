export default function PersonalInformation() {
    return (
        <section>
            <div className="flex items-center justify-between border-b border-[#e8e8e8] pb-2">
                <h2 className="text-[14px] font-medium text-[#111]">
                    Personal Information
                </h2>

                <button
                    className="mr-28.5 text-[10px] text-[#168cf4] underline cursor-pointer "
                    type="button"
                >
                    Edit
                </button>
            </div>

            <dl className="grid grid-cols-[1fr_127px] gap-y-1.5 px-2.75 pt-3.5 text-[12px] leading-4.25 text-[#444]">
                <dt>First Name</dt>
                <dd>Tita Piya</dd>

                <dt>Last Name</dt>
                <dd>Branoskivy</dd>

                <dt>Gender</dt>
                <dd>Female</dd>

                <dt>Date of Birth</dt>
                <dd>12 Aug 2000</dd>
            </dl>
        </section>
    );
}