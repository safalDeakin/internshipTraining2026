import { useState } from "react";
import { ACTIONS, RESOURCES, type Action } from "../../../data/permission";
import usePermissions from "../../../hooks/usePermissions";
import { X } from "lucide-react";
import { rooms } from "../../../data/rooms";
import { useOrganization } from "../../../context/OrganizationContext";

type RoomType = {
  roomNumber: string;
  roomType: string;
  // price: string;
};
const Rooms = () => {
  const { canAccess } = usePermissions();
  const { organization } = useOrganization();
  const [createModal, setCreateModal] = useState(false);
  const [roomForm, setRoomForm] = useState<RoomType>({
    roomNumber: "",
    roomType: "",
    // price: "",
  });
  //list of room
  const [room, setRoom] = useState(rooms);

  const organizationRooms = room.filter(
    (r) => r.organizationId === organization?.id,
  );
  //action according to role
  const handleAction = (action: Action) => {
    if (!canAccess(RESOURCES.ROOM, action)) {
      alert("Not allowed");
      return;
    }
    if (action === ACTIONS.CREATE) {
      setCreateModal(true);
      return;
    }
    alert(`${action} allowed by this role`);
  };
  //input chnage
  const handleInputChnage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setRoomForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  ///create form
  const handleCreateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomForm.roomNumber || !roomForm.roomType) {
      alert("Please fill all fields");
      return;
    }
    if (!organization?.id) {
      alert("Organization not found");
      return;
    }
    const newroom = {
      id: Date.now(),
      roomNumber: roomForm.roomNumber,
      roomType: roomForm.roomType,
      organizationId: organization.id,
    };
    setRoom((prev) => [...prev, newroom]);
    console.log("CR", roomForm);
    alert("Create Succesfulyy");
    setRoomForm({
      roomNumber: "",
      roomType: "",
      // price: "",
    });
    setCreateModal(false);
  };
  return (
    <div className="border border-gray-300">
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Rooms</h2>

        {organizationRooms.length === 0 ? (
          <p className="text-gray-500">No rooms available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {organizationRooms.map((room) => (
              <div
                key={room.id}
                className="rounded-lg border border-gray-300 bg-white p-5 shadow"
              >
                <h3 className="text-lg font-bold">Room {room.roomNumber}</h3>

                <p className="mt-2 text-gray-600">Type: {room.roomType}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-start gap-5">
        {/* <button
          className="bg-blue-950 text-white font-bold text-xs p-2 shadow-2xl cursor-pointer rounded-lg "
          onClick={() => handleAction(ACTIONS.VIEW)}
        >
          View
        </button> */}
        <button
          className="bg-blue-950 text-white font-bold text-xs p-2 shadow-2xl cursor-pointer rounded-lg "
          onClick={() => handleAction(ACTIONS.CREATE)}
        >
          Create
        </button>
        <button
          className="bg-blue-950 text-white font-bold text-xs p-2 shadow-2xl cursor-pointer rounded-lg "
          onClick={() => handleAction(ACTIONS.UPDATE)}
        >
          Update
        </button>
        <button
          className="bg-blue-950 text-white font-bold text-xs p-2 shadow-2xl cursor-pointer rounded-lg "
          onClick={() => handleAction(ACTIONS.DELETE)}
        >
          {" "}
          Delete
        </button>
      </div>
      {createModal && (
        <div className="bg-gray-50 shadow-sm p-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Create Room</h1>
            <button onClick={() => setCreateModal(false)}>
              <X />
            </button>
          </div>
          <form className="p-5 flex flex-col gap-5" onSubmit={handleCreateForm}>
            <div>
              <label>Room Number</label>
              <input
                value={roomForm.roomNumber}
                name="roomNumber"
                type="text"
                onChange={handleInputChnage}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none "
              />
            </div>
            <div>
              <label>Room Type</label>
              <select
                name="roomType"
                value={roomForm.roomType}
                onChange={handleInputChnage}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="">Select room</option>
                <option value="Single">Single</option>
                <option value="Doubled">Doubled</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
            {/* <div>
              <label>Price</label>
              <input
                value={roomForm.price}
                name="price"
                type="number"
                onChange={handleInputChnage}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none "
              />
            </div> */}
            <button
              type="submit"
              className="bg-blue-900 text-white cursor-pointer py-2 w-auto rounded-2xl "
            >
              Create
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Rooms;
