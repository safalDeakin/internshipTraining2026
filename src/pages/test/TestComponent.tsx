import ResponsiveLayout from "../../component/ResponsiveLayout";

const TestComponent = () => {
  return (
    <ResponsiveLayout
      sidebar={(closeBar) => <TestNav closeBar={closeBar} />}
    />
  );
};

export default TestComponent;