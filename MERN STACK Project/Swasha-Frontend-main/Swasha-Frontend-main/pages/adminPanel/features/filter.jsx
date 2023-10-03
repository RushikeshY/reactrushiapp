import { useRouter } from "next/router"
import { useState } from "react"
import { DownArrowIcon } from "../../../components/svg"

const Filter = ({ dropdownList, dropdownName }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const handleFilter = (data) =>{
    if(data.sort){
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, sortBy: data.sort.type, sortOrder: data.sort.order },
        },
        undefined,
        { shallow: true }
      );
    }else{
      router.push({query: { category: data._id } });
    }
    setShowDropdown(false)
  }
  
  return (
    <div className="relative">
      <button onClick={() => setShowDropdown(!showDropdown)} className="border-1 relative text-gray-1200 md:w-40 w-full hover:shadow-md font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center" type="button">
        {dropdownName}
        <DownArrowIcon className='absolute right-3 text-gray-1400'/>
      </button>
      {
        showDropdown && <div id="dropdown" className="absolute top-10 z-10 bg-white border-1 rounded-lg shadow md:w-40 w-full">
          <div className="text-sm text-center cursor-pointer divide-y divide-x-0 divide-solid divide-[#00000033]">
            {
              dropdownList && dropdownList.map((data) => (
                <div key={data._id} onClick={()=>handleFilter(data)} className="hover:bg-gray-400 py-2">{data.name}</div>
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Filter