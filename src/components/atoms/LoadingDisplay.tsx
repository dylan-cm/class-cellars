import { PropagateLoader } from "react-spinners";

const LoadingDisplay = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <PropagateLoader color="#e5586c" size={15} />
  </div>
);

export default LoadingDisplay;
