import { IconContext } from "react-icons";

export default function Icon({ children, onClick, ...props }) {
  return (
    <IconContext.Provider value={{ ...props }}>
      <button onClick={onClick}>
        <div>{children}</div>
      </button>
    </IconContext.Provider>
  );
}
