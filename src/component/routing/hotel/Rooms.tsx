import { ACTIONS, RESOURCES, type Action } from "../../../constants/permission";
import usePermissions from "../../../hooks/usePermissions";

const Rooms = () => {
  const { canAccess } = usePermissions();
  const handleAction = (action: Action) => {
    if (!canAccess(RESOURCES.ROOM, action)) {
      alert("Not allowed");
      return;
    }
    alert(`${action} allowed by this role`);
  };
  // const canView = canAccess(RESOURCES.ROOM, ACTIONS.VIEW);
  // const canCreate = canAccess(RESOURCES.ROOM, ACTIONS.CREATE);
  // const canUpdate = canAccess(RESOURCES.ROOM, ACTIONS.UPDATE);
  // const canDelete = canAccess(RESOURCES.ROOM, ACTIONS.DELETE);
  return (
    <div>
      <h1>ROOM</h1>
      <div className="flex gap-5">
        <button
          className="bg-blue-100"
          onClick={() => handleAction(ACTIONS.VIEW)}
        >
          View
        </button>
        <button
          className="bg-blue-100"
          onClick={() => handleAction(ACTIONS.CREATE)}
        >
          Create
        </button>
        <button
          className="bg-blue-100"
          onClick={() => handleAction(ACTIONS.UPDATE)}
        >
          Update
        </button>
        <button
          className="bg-blue-100"
          onClick={() => handleAction(ACTIONS.DELETE)}
        >
          {" "}
          Delete
        </button>
      </div>
    </div>
  );
};

export default Rooms;
