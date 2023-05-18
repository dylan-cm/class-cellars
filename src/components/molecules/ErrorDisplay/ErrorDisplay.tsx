export const ErrorDisplay = ({ message }: { message: string }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
    }}
  >
    <h1 style={{ color: "red" }}>An error has occurred!</h1>
    <p>{message}</p>
    <p>Please try again later.</p>
  </div>
);

export default ErrorDisplay;
