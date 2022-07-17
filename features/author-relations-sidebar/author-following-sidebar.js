import SideHeader from "../../components/shared/sidebars/sidebar-header";
export default function AuthorFollowingSideBar() {
  return (
    <div>
      <SideHeader>Following</SideHeader>
    </div>
  );
}

function Item({ children }) {
  return children;
}
