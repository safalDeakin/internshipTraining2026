import { useState } from "react";
import { ACTIONS, RESOURCES, type Action } from "../security/permission";
// import usePermissions from "../hooks/usePermissions";
import { X } from "lucide-react";
import { rooms } from "../data/rooms";
import { useOrganization } from "../context/OrganizationContext";
import AccessControl from "../security/AccessControl";
import { useAuth } from "../auth/AuthContext";

type RoomType = {
  roomNumber: string;
  roomType: string;
  // price: string;
};
const Rooms = () => {
  // const { canAccess } = usePermissions();
  const { user } = useAuth();
  const accessControl = new AccessControl();
  const { organization } = useOrganization();
  const [createModal, setCreateModal] = useState(false);
  const [roomForm, setRoomForm] = useState<RoomType>({
    roomNumber: "",
    roomType: "",
  });
  //list of room
  const [room, setRoom] = useState(rooms);

  //create accescontrol
  //filter room acc to org
  const organizationRooms = room.filter(
    (r) => r.organizationId === organization?.id,
  );
  //action according to role
  const handleAction = (action: Action) => {
    if (!user) {
      return null;
    }
    console.log("USER:", user);
    console.log("ROLE:", user.role);
    console.log("RESOURCE:", RESOURCES.ACCOMMODATION);
    console.log("ACTION:", action);

    //can craete accomodation
    const allowed = accessControl.can(
      user.role,
      RESOURCES.ACCOMMODATION,
      action,
    );
    console.log("ALLOWED:", allowed);
    if (!allowed) {
      alert("Not allowed by this");
      return;
    }
    if (action === ACTIONS.CREATE) {
      setCreateModal(true);
      return;
    }
    alert(`${action} allowed by this role.`);
  };
  //input chnage text inout and select input
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
    //newroom object
    const newroom = {
      id: Date.now(),
      roomNumber: roomForm.roomNumber,
      roomType: roomForm.roomType,
      organizationId: organization.id,
    };
    // add tothe list of room
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
    <div className="flex flex-col gap-5">
      <div className="">
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
      <div className="border border-gray-100 p-2 flex justify-center items-start gap-5">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h1 className="text-2xl font-bold">Create Room</h1>
              <button onClick={() => setCreateModal(false)}>
                <X />
              </button>
            </div>
            <form
              className="p-5 flex flex-col gap-5"
              onSubmit={handleCreateForm}
            >
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
        </div>
      )}
    </div>
  );
};

export default Rooms;
