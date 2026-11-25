import { CarFront, Music, Monitor, Wifi, Pencil, Edit3 } from "lucide-react";
import type { Vehicle } from "./TransportationLayout";
import ReusableButton from "../../../../shell/shared/components/ReusableButton";

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onEdit: () => void;
}

const amenityIcons: Record<string, React.ReactNode> = {
  Music: <Music size={15} />,
  "Air Conditioning": <Monitor size={15} />,
  Wifi: <Wifi size={15} />,
};
interface InformationProps {
  title: string;
  value: string;
}
export const Information = ({ title, value }: InformationProps) => {
  return (
    <div className="grid grid-cols-2 items-center gap-4 py-1">
      <p className="text-left text-sm text-gray-600">{title}</p>
      <p className="text-left text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
};
const TransportationDetails = ({ vehicle, onEdit }: VehicleDetailsProps) => {
  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <CarFront size={19} className="text-gray-700" />

            <h2 className="text-base font-semibold text-gray-900">
              {vehicle.name}
            </h2>

            <span className="text-sm text-gray-500">({vehicle.category})</span>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-5 text-gray-500">
            {vehicle.description}
          </p>
        </div>

        <ReusableButton variant="outline" size="sm" onClick={onEdit}>
          <Pencil size={14} />
          Edit
        </ReusableButton>
      </div>

      {/* OCCUPANCY */}
      <div className="mt-5 space-y-1">
        <p className="text-sm text-gray-500">
          Base Occupancy:{" "}
          <span className="font-medium text-gray-700">
            {vehicle.baseOccupancy}
          </span>
        </p>

        <p className="text-sm text-gray-500">
          Max Occupancy:{" "}
          <span className="font-medium text-gray-700">
            {vehicle.maxOccupancy}
          </span>
        </p>
      </div>

      {/* AMENITIES HEADER */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-gray-700">
          General Amenities ({vehicle.amenities.length} items)
        </h3>

        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-medium text-blue-700 underline underline-offset-2 hover:text-blue-900"
        >
          + Edit Amenities
        </button>
      </div>

      {/* AMENITIES CONTAINER */}
      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-gray-50 p-3">
        {vehicle.amenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700"
          >
            {amenityIcons[amenity] ?? <Edit3 size={15} />}
            {amenity}
          </div>
        ))}

        <button
          type="button"
          onClick={onEdit}
          title="Edit amenities"
          className="ml-auto rounded p-2 text-blue-600 hover:bg-blue-50"
        >
          <Edit3 size={17} />
        </button>
      </div>
      {/* Information  */}
      <div className="flex justify-between items-center border border-gray-300 p-4">
        <div>
          <h1 className="text-left">Purchase Information</h1>
          <>
            <Information title="Purchase Date" value="2083/01/01" />
            <Information title="Suplier " value="ABS showroom " />{" "}
            <Information title="Cost" value="50000" />{" "}
            <Information title="Condition" value="good" />
          </>
        </div>
        <div>
          <h1 className="text-left">Rental Information</h1>
          <>
            <Information title="Rate Type" value="2083/01/01" />
            <Information title="Rate " value="ABS showroom " />{" "}
          </>
        </div>
      </div>
      {/* CREATED INFORMATION */}
      <div className="mt-5 space-y-1">
        <p className="text-xs text-gray-600">Created By: {vehicle.createdBy}</p>

        <p className="text-xs text-gray-600">
          Created Date/Time: {vehicle.createdAt}
        </p>
      </div>
    </div>
  );
};
export default TransportationDetails;
