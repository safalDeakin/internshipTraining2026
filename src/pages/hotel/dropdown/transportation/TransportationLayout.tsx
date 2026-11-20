import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import MasterDetailView from "../../../../lib/component/MasterDetailView/MasterDetailView";
import ReusableButton from "../../../../shell/shared/components/ReusableButton";
import Container from "../../../../lib/component/Container/Container";

import TransportationDetails from "./TransportationDetails";
import useDialogBox from "../../../../lib/component/DialogueBox/useDialogueBox";
import VehicleAddModal from "../modal/VehicleAddModal";

export interface Vehicle {
  id: number;
  name: string;
  category: string;
  description: string;
  baseOccupancy: number;
  maxOccupancy: number;
  availability: string;
  createdBy: string;
  createdAt: string;
  amenities: string[];
}

interface VehicleFormData {
  vehicleCode: string;
  vehicleName: string;
  category: string;
  type: string;
  model: string;
  brand: string;
  purchaseDate: string;
  supplier: string;
  invoiceNo: string;
  cost: number;
  condition: string;
  rateType: string;
  rate: number;
}

const initialVehicleData: Vehicle[] = [
  {
    id: 1,
    name: "XUV 300",
    category: "DLXR",
    description: "lorem epsum",
    baseOccupancy: 2,
    maxOccupancy: 4,
    availability: "Available",
    createdBy: "Utsha Shrestha",
    createdAt: "2023/02/12 14:08:30",
    amenities: ["Music", "Air Conditioning", "Wifi"],
  },
  {
    id: 2,
    name: "Scorpio",
    category: "7 Seater",
    description: "Comfortable vehicle suitable for group transportation.",
    baseOccupancy: 4,
    maxOccupancy: 7,
    availability: "Available",
    createdBy: "Utsha Shrestha",
    createdAt: "2023/02/12 14:08:30",
    amenities: ["Music", "Air Conditioning", "Wifi"],
  },
];

const TransportationLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicleData);

  const { showDialog, closeDialog } = useDialogBox();

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) =>
      `${vehicle.name} ${vehicle.category}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }, [vehicles, searchQuery]);

  // Open Add Vehicle dialog
  const handleNewVehicle = async () => {
    const result = await showDialog<VehicleFormData>({
      title: "Add Vehicle",
      width: 650,
      showHeader: true,
      closeOnEscape: true,
      closeOnBackdrop: true,
      content: (
        <VehicleAddModal
          onClose={() => closeDialog()}
          onConfirm={(data) => closeDialog(data)}
        />
      ),
    });

    if (!result) return;

    const occupancy = Number(result.type.match(/\d+/)?.[0] ?? 2);

    const newVehicle: Vehicle = {
      id: Date.now(),
      name: result.vehicleName,
      category: result.category,
      description: `${result.brand} ${result.model}`,
      baseOccupancy: occupancy,
      maxOccupancy: occupancy,
      availability: "Available",
      createdBy: "Admin",
      createdAt: new Date().toLocaleString(),
      amenities: [],
    };

    setVehicles((previous) => [...previous, newVehicle]);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    console.log("Edit vehicle:", vehicle);
  };

  return (
    <MasterDetailView<Vehicle, number>
      title="Vehicle"
      items={filteredVehicles}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      getId={(vehicle) => vehicle.id}
      headerChildren={
        <ReusableButton variant="outline" size="sm" onClick={handleNewVehicle}>
          <Plus size={15} />
          New
        </ReusableButton>
      }
      listItemBuilder={(vehicle) => (
        <div className="w-full min-w-0 space-y-1 text-left">
          <p className="truncate text-sm font-semibold text-gray-800">
            {vehicle.name}
          </p>

          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-gray-500">{vehicle.category}</span>

            <span className="text-xs text-green-600">
              {vehicle.availability}
            </span>
          </div>
        </div>
      )}
      detailContentBuilder={(selectedId) => {
        const selectedVehicle = vehicles.find(
          (vehicle) => vehicle.id === selectedId,
        );

        if (!selectedVehicle) return null;

        return (
          <Container type="main" background="surface-default">
            <TransportationDetails
              vehicle={selectedVehicle}
              onEdit={() => handleEditVehicle(selectedVehicle)}
            />
          </Container>
        );
      }}
    />
  );
};

export default TransportationLayout;
