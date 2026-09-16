import React from "react";

const Dashboard = () => {
  return (
    <div>
      helo Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni nulla
      unde recusandae voluptatibus pariatur, natus, sunt a asperiores ipsum
      necessitatibus reiciendis aliquam voluptate itaque ullam quod vero porro
      adipisci nisi.
    </div>
  );
};

export default Dashboard;

// import {
//   ACTIONS,
//   RESOURCES,
//   type Action,
//   type Resources,
// } from "../../constants/permission";
// import { useAuth } from "../../context/AuthContext";
// import { useOrganization } from "../../context/OrganizationContext";
// import { rooms } from "../../data/rooms";
// import usePermissions from "../../hooks/usePermissions";

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const { organization } = useOrganization();
//   const { canAccess } = usePermissions();
//   const navigate = useNavigate();
//   const organizationRooms = rooms.filter(
//     (room) => room.organizationId === organization?.id,
//   );
//   const handleAction = (resource: Resources, action: Action) => {
//     if (!canAccess(resource, action)) {
//       alert("Not accesible by this role");
//       return;
//     }
//     alert(`${action}allowed`);
//   };
//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };
//   return (
//     <div className="p-4 border border-gray-400">
//       <h1 className="font-2xl font-bold">Hello! {user?.name} Welcome back</h1>
//       <p className="text-gray-500">Role:{user?.role}</p>
//       <p className="text-gray-500">Org:{organization?.name}</p>
//       <div className="bg-white shadow-2xl p-1">
//         {organizationRooms.map((room) => {
//           return (
//             <div key={room.id} className="bg-blue-50">
//               <p className="p-1">
//                 Room No:{" "}
//                 <span className="text-gray-600 font-bold">
//                   {room.roomNumber}
//                 </span>
//                 -Type:{" "}
//                 <span className="text-gray-600 font-bold">{room.type}</span>
//               </p>
//               {/* <div className="flex gap-10">
//                 <button
//                   onClick={() => handleAction(RESOURCES.ROOM, ACTIONS.VIEW)}
//                   className="bg-blue-950 text-white px-4 py-1 rounded-2xl"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() => handleAction(RESOURCES.ROOM, ACTIONS.CREATE)}
//                   className="bg-blue-950 text-white  px-4 py-1 rounded-2xl"
//                 >
//                   Create
//                 </button>
//                 <button
//                   onClick={() => handleAction(RESOURCES.ROOM, ACTIONS.UPDATE)}
//                   className="bg-blue-950 text-white  px-4 py-1 rounded-2xl"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => handleAction(RESOURCES.ROOM, ACTIONS.DELETE)}
//                   className="bg-blue-950 text-white  px-4 py-1 rounded-2xl"
//                 >
//                   Delete
//                 </button>
//               </div> */}
//             </div>
//           );
//         })}
//       </div>
//       <button onClick={handleLogout} className="bg-red-800 p-1 text-white mt-2">
//         logout
//       </button>
//     </div>
//   );
// };

// export default Dashboard;
