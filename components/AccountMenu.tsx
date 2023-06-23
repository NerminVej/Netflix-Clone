import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@component/hooks/useCurrentUser";

// Define the props for the AccountMenu component
interface AccountMenuProps {
  visible?: boolean;
}

// AccountMenu component with React.FC type
const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  // Fetch the current user data using the useCurrentUser hook
  const { data } = useCurrentUser();

  // If the visibility prop is false, render nothing
  if (!visible) {
    return null;
  }

  // Render the account menu component
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        {/* User profile section */}
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          {/* User profile image */}
          <img
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt=""
          />
          {/* User name */}
          <p className="text-white text-sm group-hover/item:underline">
            {data?.name}
          </p>
        </div>
        {/* Separator */}
        <hr className="bg-gray-600 border-0 h-px my-4" />
        {/* Sign out section */}
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
