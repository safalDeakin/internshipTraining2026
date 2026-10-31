// author:shrajja
import type { FoodCardProps } from "../types/OrderingTypes";
const FoodCards = ({
  image,
  label,
  date,
  status,
  isSelected,
  onClick,
}: FoodCardProps) => {
  return (
    <>
      {/* Food Card */}
      <div
        onClick={onClick}
        className={`w-full min-w-0 cursor-pointer overflow-hidden rounded-lg p-4 shadow-md transition ${isSelected ? "border border-gray-200" : "border border-gray-100 hover:shadow-lg"}`}
      >
        <img
          src={image || "/images.jpg"}
          alt={label}
          className="h-28 w-full rounded-md object-cover"
        />
        <div className="pt-2">
          <h3 className="truncate font-medium">{label}</h3>
          <p className="flex justify-between gap-2 text-xs">
            {date}
            <span
              className={
                status === "N/A"
                  ? "rounded bg-red-50 px-2 text-red-600"
                  : "rounded bg-green-50 px-2 text-green-600"
              }
            >
              {status || "Available"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
export default FoodCards;
