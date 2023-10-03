import { useState } from "react";

const EditUser = ({ user }) => {
  if (!user) user = {};
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    mobileNum: user.mobileNum,
    role: user.role,
    mobileVerified: user.mobileVerified,
    emailVerified: user.emailVerified,
  });
  const handleChange = (e, prop) => {
    setData({ ...data, [prop]: e.target.value });
  };

  const submitData = (event) => {
    console.log(data);
    event.preventDefault();
  };

  const deleteUser = (id) => {
    alert(`${id} Delete User`);
    setShow(false);
  };

  return (
    <form className="px-6 py-4 m-4 rounded-2xl  shadow-xl">
      <div className="text-lg font-semibold">Edit User</div>
      <hr className="mb-6" />
      <div className="grid gap-8 mb-6 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-semibold">User Name</label>
          <input
            onChange={(e) => {
              handleChange(e, "name");
            }}
            value={data?.name}
            type="text"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter Product Code"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">Role</label>
          <input
            onChange={(e) => {
              handleChange(e, "role");
            }}
            value={data?.role}
            type="text"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter Colors"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">
            Mobile Number
          </label>
          <input
            onChange={(e) => {
              handleChange(e, "mobileNum");
            }}
            value={data?.mobileNum}
            type="text"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter General Details"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Mobile Number Verified
          </label>
          <input
            onChange={(e) => {
              handleChange(e, "mobileVerified");
            }}
            value={data?.mobileVerified}
            type="text"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter General Details"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input
            onChange={(e) => {
              handleChange(e, "email");
            }}
            value={data?.email}
            type="email"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter Product Name"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Email Verified
          </label>
          <input
            onChange={(e) => {
              handleChange(e, "emailVerified");
            }}
            value={data?.emailVerified}
            type="text"
            className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-full p-3"
            placeholder="Enter Colors"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          onClick={submitData}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-sm sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <div className="relative cursor-pointer">
          <button
            onClick={(event) => {
              event.preventDefault();
              setShow(true);
            }}
            className="text-white bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-sm sm:w-auto px-5 py-2.5 text-center"
          >
            Delete User
          </button>
          {show ? (
            <div className="absolute text-sm font-semibold top-[-80px] bg-[#f1f1f1] shadow-xl rounded-md">
              <div
                onClick={() => {
                  deleteUser(user._id);
                }}
                className="px-6 py-2 hover:bg-[#d8d3d3] rounded-md"
              >
                Confirm
              </div>
              <hr className="p-0 m-0" />
              <div
                onClick={() => {
                  setShow(false);
                }}
                className="px-6 py-2 hover:bg-[#d8d3d3] rounded-md"
              >
                Cancel
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
};

export default EditUser;
