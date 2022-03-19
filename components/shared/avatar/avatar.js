import styled from "styled-components";
import Image from "../image/image";

export default function Avatar({ size, ...props }) {
  return (
    <div>
      <AvatarStyled variant="circle" size={size} {...props} />
    </div>
  );
}
export const AvatarStyled = styled(Image)`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
`;
