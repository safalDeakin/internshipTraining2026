import type { Checklist } from "../../../../../domain/dayActivity";


type ChecklistCardsProps = {
    checklists: Checklist[];
};

export function ChecklistCards({ checklists }: ChecklistCardsProps) {

    return (
        <section className="grid gap-3 sm:grid-cols-2">
            {checklists.map((checklist) => (
                <fieldset
                    key={checklist.title}
                    className="min-w-0 rounded-xs border border-[#d8dcde] bg-white px-1.5 pb-2 shadow-[0_2px_3px_rgba(0,0,0,.18)]"
                >
                    <legend className="px-0.5 text-[10px] text-[#303a40]">{checklist.title}</legend>
                    <div className="mt-0.5">
                        {checklist.items.map((item) => (
                            <label
                                key={item}
                                className="flex cursor-pointer items-start gap-1 text-[9px] leading-3.5 text-[#404a50]"
                            >
                                <input
                                    type="checkbox"
                                    className="mt-0.5 size-2.5 shrink-0 appearance-none border border-[#aeb6bb] bg-white checked:border-[#5e87ac] checked:bg-[#5e87ac]"
                                />
                                <span>{item}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            ))}
        </section>
    );
}
