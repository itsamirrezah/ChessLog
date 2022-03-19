import SideHeader from "../../components/shared/sidebars/sidebar-header";
import Item from "./item";
import useDiscoverUsers from "../../lib/services/discover-users";

export default function WhoToFollow() {
  const { data: users } = useDiscoverUsers();

  if (!users || users.length === 0) return null;

  return (
    <div>
      <SideHeader>Who to follow</SideHeader>
      {users.map((author, index) => (
        <Item key={index} author={author} />
      ))}
    </div>
  );
}
