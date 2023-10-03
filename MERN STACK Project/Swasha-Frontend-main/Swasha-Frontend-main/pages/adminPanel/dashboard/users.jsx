import React, { useEffect, useState } from 'react'
import { makeRequest, getAllUsers } from '../../../util/ApiClient'
import { Edit2Icon } from '../../../components/svg'

const Users = ({ setCurrent, setUser }) => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    makeRequest(
      getAllUsers,
      {},
      {
        onSuccess: (res) => {
          setUsers(res.users)
        },
        onError: (e) => {
          console.log(e, "error")
        },
      }
    );
  }, [])

  return (
    <div className='w-[90vw] md:w-full'>
      <div className='text-xl font-bold mb-4'>
        Users
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-5 py-3">
                Name
              </th>
              <th scope="col" className="px-5 py-3">
                Role
              </th>
              <th scope="col" className="px-5 py-3">
                Mobile Number
              </th>
              <th scope="col" className="px-5 py-3">
                Email
              </th>
              <th scope="col" className="px-5 py-3">
                <span>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users?.map((user) => (
                <tr key={user._id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-5 py-4 font-medium  whitespace-nowrap">
                    {user.name}
                  </th>
                  <td className="px-5 py-4">
                    {user.role}
                  </td>
                  <td className="px-5 py-4">
                    {user.mobileNum}
                  </td>
                  <td className="px-5 py-4">
                    {user.email}
                  </td>
                  <td className="px-5 py-4">
                    <div onClick={() => { setCurrent("editUser"); setUser(user) }} className='cursor-pointer'>
                      <Edit2Icon/>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users