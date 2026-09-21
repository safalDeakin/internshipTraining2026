import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="p-5 text-center md:text-left ">
      <h1 className="text-2xl font-bold">Welcome {user?.name} !!!!!!!!!!!! </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni nulla
        unde recusandae voluptatibus pariatur, natus, sunt a asperiores ipsum
        necessitatibus reiciendis aliquam voluptate itaque ullam quod vero porro
        adipisci nisi.
      </p>
      <button>Logout</button>
    </div>
  );
};

export default Dashboard;
