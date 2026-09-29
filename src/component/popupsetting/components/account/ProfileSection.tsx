import { UserRound } from "lucide-react";


export default function ProfileSection() {
  return (
    <section>
      <h2 className="border-b border-[#e8e8e8] pb-2 text-[14px] font-medium text-[#111]">
        Profile - Theme
      </h2>

      <div className="flex h-29 items-center gap-3.5 pl-1.75">
        <div className="grid size-20.5 shrink-0 place-items-center overflow-hidden rounded-full bg-[#f497a1] text-[#183c58]">
          <UserRound
            aria-label="Profile placeholder"
            size={61}
            strokeWidth={1.15}
          />
        </div>

        <label className="cursor-pointer rounded-[3px] bg-[#78b5ee] px-1.5 py-1 text-[10px] text-white shadow-sm transition-colors hover:bg-[#5ca5e9] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#348fe9]">
          Change Picture

        </label>
      </div>
    </section>
  );
}