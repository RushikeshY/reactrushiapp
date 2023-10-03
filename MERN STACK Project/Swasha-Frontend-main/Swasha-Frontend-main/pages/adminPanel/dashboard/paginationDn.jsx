import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LeftArrowIcon, RightArrowIcon } from "../../../components/svg";

const PaginationDn = ({totalProduct,resLength}) => {
    const router = useRouter()
    const [page,setPage] = useState(1)
    const activeCss = "z-10 px-2 md:px-3 py-1.5 md:py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700";
    const normalCss = "px-2 md:px-3 py-1.5 md:py-2 leading-tight text-gray-1300 bg-white no-underline border-2 hover:bg-gray-100 hover:text-gray-1700"

    useEffect(()=>{
        router.push({query: { ...router.query, page: page } })
    },[page])

    return (
        <div className="text-right">
            <ul className="inline-flex items-center -space-x-px list-none">
                <li>
                    <a href="#" onClick={()=>{
                        if(page>=2){
                            setPage(page-1)
                        }
                    }} className="block px-2 md:px-3 py-1.5 md:py-2 ml-0 leading-tight text-gray-1300 bg-white border-2 rounded-l-lg hover:bg-gray-100 hover:text-gray-1700">
                        <LeftArrowIcon/>
                    </a>
                </li>
                <li>
                    <a href="#" aria-current="page" onClick={()=>setPage(1)} className={`${page==1?activeCss:normalCss}`}>1</a>
                </li>
                <li>
                    <a href="#" onClick={()=>setPage(2)} className={`${page==2?activeCss:normalCss}`}>2</a>
                </li>
                <li>
                    <a href="#" onClick={()=>setPage(3)} className={`${page==3?activeCss:normalCss}`}>3</a>
                </li>
                <li>
                    <a href="#" onClick={()=>setPage(4)} className={`${page==4?activeCss:normalCss}`}>4</a>
                </li>
                <li>
                    {page>6 ? <a href="#" className={normalCss}>...</a> : <a href="#" onClick={()=>setPage(5)} className={`${page==5?activeCss:normalCss}`}>5</a>}
                </li>
                <li>
                    <a href="#" className={`${page>5?activeCss:normalCss}`}> <span>{page>5?page:"..."}</span></a>
                </li>
                <li>
                    <a href="#" onClick={()=>{
                        if(page<(totalProduct/resLength)){
                            setPage(page+1)                        
                        }
                    }} className="block px-2 md:px-3 py-1.5 md:py-2 leading-tight text-gray-1300 bg-white border-2 rounded-r-lg hover:bg-gray-100 hover:text-gray-1700">
                        <RightArrowIcon/>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default PaginationDn