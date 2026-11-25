interface DetailItemProps {
  label: string;
  value?: string | number | null;
  strong?: boolean;
}

export function DetailItem({ label, value, strong = false }: DetailItemProps) {
  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-3 py-0.5 sm:grid-cols-[120px_minmax(0,1fr)]">
      <dt className=" text-slate-600">{label}</dt>

      <dd className={`min-w-0 break-words  text-slate-800 ${strong ? "" : ""}`}>
        {value ?? "-"}
      </dd>
    </div>
  );
}
