export default function Input({ children, inputRef, type = "file", ...props }) {
  return (
    <>
      <input
        type={type}
        ref={inputRef}
        style={{ display: "none" }}
        {...props}
      />
      {children}
    </>
  );
}
