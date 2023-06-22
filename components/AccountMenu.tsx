import React from 'react'
import { signOut } from 'next-auth/react'

interface AccountMenuProps {
    visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    visible
}) => {
  return (
    <div className='bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex'>

    </div>
  )
}

export default AccountMenu