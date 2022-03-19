import TextButton from "../../../components/shared/buttons/text-button";

export default function SwitchButton({ children, ...props }) {
  return (
    <TextButton isBold color="#1a8a17" {...props}>
      {children}
    </TextButton>
  );
}
