//author:shrjja

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">403</h1>
        <h2 className="text-2xl font-semibold mt-2">Unauthorized</h2>
        <p className="text-gray-500 mt-2">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
