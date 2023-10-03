import React, { useEffect, useState,useRouter} from 'react'
import { getAllOrders,handleOrderStatus,getAllReturnsAdmin,handleCancelRefundStatus,makeRequest } from '../../../util/ApiClient'
import OrderDetails from '../orderAction/orderDetails';
import Dialog from '../../../components/Dialog';
import { DownArrowIcon } from "../../../components/svg"
import Search from '../features/search';
import PaginationDn from './paginationDn';


const Order = ({setCurrent,setOrder}) => {
  const [orders, setOrders] = useState([]);
  const [dateSortingOrder, setDateSortingOrder] = useState('oldest');
  const [priceSortingOrder, setPriceSortingOrder] = useState('');
  const [statusFilter1, setStatusFilter1] = useState([{_id:1,name:'All STATUSES'},{_id:2,name:'created'},{_id:3,name:'processing'},{_id:4,name:'shipped'},{_id:5,name:'delivered'},{_id:6,name:'cancelled'},{_id:7,name:'returned'},]);
  const [statusFilter, setStatusFilter] = useState('All STATUSES');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [popUp, setPopUp] = useState({});
  const [totalOrders, setTotalorders] = useState();
  const [resLength, setResLength] = useState();
  const [inputPopupVisible, setInputPopupVisible] = useState(false);
  let status = '';
  let returnStatus ='';
  let allReturnOrders =[];
  let returnOrder = [];
  const [returnOrders,setReturnOrders] = useState([]);
  const [trackingLink, setTrackingLink] = useState('');
  const [fetch,setFetch] = useState('0');
  let newCancelRefundStatus ='';

  
  useEffect(() => {
    setFetch('0');
    makeRequest(
      getAllOrders,
      {},
      {
        loading:true,
        onSuccess: (res) => {
          setOrders(res.orders);
          setFilteredOrders(res.orders);
          setTotalorders(res.orders.length)
          setResLength(10); // Initialize filtered orders with all orders
        },
        onError: (e) => {
          console.log(e, 'error');
        },
      }
    );
  }, [fetch]);

  useEffect(() => {
    makeRequest(getAllReturnsAdmin, {}, {
      onSuccess: (res) => {
       
         allReturnOrders = res.returns
         allReturnOrders.map(Item => {
          returnOrder.indexOf(Item.orderId)<0?returnOrder.push(Item.orderId):"";  
        })
        console.log(returnOrder,'123')
        setReturnOrders(returnOrder);
      },
    });
  },[]);


  useEffect(() => {
    setFilteredOrders(orders);
    setDateSortingOrder('oldest'); // Reset date sorting
    setPriceSortingOrder('');     // Reset price sorting
  
    if (statusFilter !== 'All STATUSES') {
      const filtered = orders.filter((order) => order.orderStatus === statusFilter);
      console.log(filtered)
      setFilteredOrders(filtered);
    }
  }, [statusFilter, orders]);
  
  

  const [selectedStatuses, setSelectedStatuses] = useState({});

  const toggleInputPopup = () => {
    setInputPopupVisible(!inputPopupVisible);
  };

  const handleInputChange = (e) => {
    setTrackingLink(e.target.value);
  };
  
  const markStatus= async (orderId, status, trackingLink, orderUser) => {
    try {
        const response = await makeRequest(
          handleOrderStatus,
          { 
            orderId:orderId,
            orderStatus:status,
            trackingLink: trackingLink,
            orderUser: orderUser
          },
          {
            method: 'POST', 
          }
        );
        console.log('API Response:', response);
  
    }
      catch (error) {
        console.error("Error updating order status:", error);
      }
    };
    const markRefundStatus = async (orderId,newCancelRefundStatus) => {
      
      try {
          const response = await makeRequest(
            handleCancelRefundStatus,
            { 
              orderId:orderId,
              newCancelRefundStatus:newCancelRefundStatus
            },
          );
          console.log('API Response:', response);
    
      }
        catch (error) {
          console.error("Error updating order status:", error);
        }
      };
  
  
  function handleDateSortingChange(event) {
      const newSortingOrder = event.target.value;
      setDateSortingOrder(newSortingOrder);
      sortOrdersByDate(newSortingOrder);
    }

  const handlePriceSortingChange = (event) => {
    const newSortingOrder = event.target.value;
    setPriceSortingOrder(newSortingOrder);
    sortOrdersByPrice(newSortingOrder);
  };

  const sortOrdersByDate = (order) => {
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (order === 'latest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (order === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
    setFilteredOrders(sortedOrders);
  };

  const sortOrdersByPrice = (order) => {
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (order === 'highest') {
        return b.totalPrice - a.totalPrice;
      } else if (order === 'lowest') {
        return a.totalPrice - b.totalPrice;
      }
    });
    setFilteredOrders(sortedOrders);
  };

  return (
    <div className="w-[90vw] md:w-full z-40 ">
      <div className="text-xl font-bold mb-4">All Orders</div>
      <div className="flex justify-end items-center mb-4">
      <div className='mr-3'>
      <Search />
      </div>
        <label className=" my-1">Sort by Date:</label>
        <div className='relative'>
        <select className='border-1  text-gray-1200 md:w-40 w-full hover:shadow-md font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center custom-select' value={dateSortingOrder} onChange={handleDateSortingChange}>
          <option value="oldest">Oldest</option>
          <option value="latest">Latest</option>
          </select>
          <span className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
            <DownArrowIcon className='text-gray-1400'/>
          </span>
        </div>
        <label className="ml-4  my-1">Sort by Price:</label>
        <div className='relative'>
          <select className='border-1 text-gray-1200 md:w-40 w-full hover:shadow-md font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center custom-select' value={priceSortingOrder} onChange={handlePriceSortingChange}>
            <option value="" default disabled hidden>PRICE</option>
            <option value="highest">Highest Price</option>
            <option value="lowest">Lowest Price</option>
          </select>
          <span className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
            <DownArrowIcon className='text-gray-1400'/>
          </span>
        </div>

        
        <label className="ml-4 my-1">Filter by Order Status:</label>
        <Filter dropdownList={statusFilter1} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-5 py-3">
                User
              </th>
              <th scope="col" className="px-5 py-3">
                Products
              </th>
              <th scope="col" className="px-5 py-3">
                Total Price
              </th>
              <th scope="col" className="px-5 py-3">
                Date
              </th>
              <th scope="col" className="px-5 py-3">
                Payment Status
              </th>
              <th scope="col" className="px-5 py-3 text-center">
                Order Status
              </th>
              <th scope="col" className="px-5 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              filteredOrders?.map((order) => {
                 return(
                <tr key={order?._id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-5 py-4 font-medium  whitespace-nowrap">
                    {order?.user?.name}
                  </th>
                  <td className="px-5 py-4">
                    {order?.products?.length}
                  </td>
                  <td className="px-5 py-4">
                    {order?.totalPrice}
                  </td>
                  <td className="px-5 py-4">
                    {order?.createdAt.split("T")[0]}
                  </td>
                  <td style={{ textTransform: 'uppercase' }} className="px-5 py-4">
                    {order?.paymentStatus}
                  </td>
                  <td className=" px-6 text-center  py-4">
                    <div style={{ textTransform: 'uppercase' }} className={`${order?.orderStatus=="shipped" ? 'bg-blue-600 p-3 rounded-full' : order?.orderStatus=="processing" ? 'bg-yellow-400 p-3 rounded-full'  : order?.orderStatus=="created" ? 'bg-green-400 p-3 rounded-full'  : order?.orderStatus=="delivered" ? 'bg-sky-400 p-3 rounded-full' : order?.orderStatus=="cancelled" ? 'bg-rose-500 p-3 rounded-full' : ""}`}>
                      {(order.orderStatus !=="delivered" && order.orderStatus !=="cancelled") &&(
                        <div>{order.orderStatus}</div>
                      )}                   
                      {order.orderStatus ==="delivered" && returnOrders.indexOf(order?._id)>=0 &&(
                        <div className={`${order?.orderStatus=="delivered" ? 'bg-white p-3 rounded-full': ""}`}>RETURNED</div>
                      )}
                      {order.orderStatus ==="delivered" && returnOrders.indexOf(order?._id)<0 &&(
                        <div>{order.orderStatus}</div>
                      )}
                      {(order.orderStatus ==="cancelled" && order.cancelRefundStatus) &&(
                        <div>Refund_Initiated</div>
                      )}
                      {(order.orderStatus ==="cancelled" && !order.cancelRefundStatus) &&(
                        <div>{order.orderStatus}</div>
                      )}
                    </div>
                  </td>
                  <td onClick={() => setPopUp({ ...popUp, [order._id]: true })} className="px-5 py-4 underline cursor-pointer">
                    View
                  </td>
                  {popUp[order._id] && order?.orderStatus=="created" && (
                    <div >                   
                    <Dialog 
                    padding=""
                    visible={popUp[order._id]}
                    setVisible={(isVisible) => setPopUp({ ...popUp, [order._id]: isVisible })}> 
                    <div className="overflow-y-auto h-[500px]">
                    <div className='flex justify-end '>
                        <button className="hollow-button mx-3 mt-3 text-sm"  onClick={() => setPopUp({ ...popUp, [order._id]: false })}>Close</button>
                     </div>
                        <OrderDetails setCurrent={setCurrent} order={order} />
                        <div className='flex justify-center mb-5'>
                        <button className="white-button mr-10 border-1 px-6 mt-3 text-sm" onClick={() => setPopUp({ ...popUp, [order._id]: false })}>Close</button>
                      <button className="blue-button-1 px-6 mt-3 text-sm" onClick={()=>{setPopUp({ ...popUp, [order._id]: false });status="processing";markStatus(order?._id, status,trackingLink,order.user);setTrackingLink('');setFetch('1')}} >
                        Mark as processing
                      </button>
                      </div>
                    </div>
                    </Dialog>
                    </div>
                    
                )}
                {popUp[order._id] && order?.orderStatus=="processing" && (
                    <div>                   
                    <Dialog
                    padding=""
                    visible={popUp[order._id]}
                    setVisible={(isVisible) => setPopUp({ ...popUp, [order._id]: isVisible })}
                    > 
                    <div className="overflow-y-auto h-[500px]">
                    <div className='flex justify-end'>
                        <button className="hollow-button mx-3 mt-3 text-sm"  onClick={() => setPopUp({ ...popUp, [order._id]: false })}>Close</button>
                     </div>
                        <OrderDetails setCurrent={setCurrent} order={order} />
                       <div className='flex justify-center mb-5'>
                        <button className="white-button mr-10 border-1 px-6 mt-3 text-sm" onClick={() => setPopUp({ ...popUp, [order._id]: false })}>Close</button>
                      <button className="blue-button-1 px-6 mt-3 text-sm" onClick={toggleInputPopup} >
                        Mark as shipped
                      </button>
                      </div>
                      </div>
                    </Dialog>
                    {inputPopupVisible && (
                       <div className='overlay'>
                      <Dialog 
                       padding=""
                       visible='true'
                       setVisible={setInputPopupVisible}
                      >
                      <div className="flex my-3 w-full">
                      <label className="p-2 bg-gray-50 font-bold">Tracking Link:</label>
                        <input
                          type="text"
                          className="border-1 text-sm rounded-xl focus:ring-black focus:border-black block w-1/2 mb-3 px-3"
                          placeholder="Enter Tracking ID"
                          value={trackingLink}
                          onChange={handleInputChange}
                        />
                        <button onClick={()=>{setInputPopupVisible(false); setPopUp({ ...popUp, [order._id]: false });status='shipped';markStatus(order?._id, status,trackingLink,order.user);setTrackingLink('');setFetch('2')}} className="text-white mb-3 mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-sm sm:w-auto px-3 text-center">
                        Submit
                        </button>
                        </div>
                      </Dialog>
                      </div>
                    )}
                    
                    
                  </div>
                    
                )}
                {popUp[order._id] && order?.orderStatus=="shipped" && (
                    <div>                   
                    <Dialog
                    padding=""
                    visible={popUp[order._id]}
                    setVisible={(isVisible) => setPopUp({ ...popUp, [order._id]: isVisible })}> 
                    <div className="overflow-y-auto h-[500px]">
                    <div className='flex justify-end'>
                        <button className="hollow-button mx-3 mt-3 text-sm"  onClick={() => setPopUp({ ...popUp, [order._id]: false })}>Close</button>
                     </div>
                        <OrderDetails setCurrent={setCurrent} order={order} />
                        <div className='flex justify-center mb-5'>
                        <button className="white-button mr-10 border-1 px-6 mt-3 text-sm" onClick={() => setPopUp({ ...popUp, [order._id]: false })}>Close</button>
                      <button className="blue-button-1 px-6 mt-3 text-sm" onClick={()=>{setPopUp({ ...popUp, [order._id]: false });status="delivered";markStatus(order?._id, status,trackingLink,order.user);setTrackingLink('');setFetch('3')}} >
                        Mark as delivered
                      </button>
                      </div>
                    </div>
                    </Dialog>
                    </div>
                    
                )}
                {popUp[order._id] && order?.orderStatus=="delivered" && (
                    <div>                   
                    <Dialog
                    padding=""
                    visible={popUp[order._id]}
                    setVisible={(isVisible) => setPopUp({ ...popUp, [order._id]: isVisible })}> 
                    <div className="overflow-y-auto h-[500px]">
                     <div className='flex justify-end'>
                        <button className="hollow-button mx-3 mt-3 text-sm"  onClick={() => setPopUp({ ...popUp, [order._id]: false })}>Close</button>
                     </div>
                        <OrderDetails setCurrent={setCurrent} order={order} />
                        <div className='flex justify-center mb-5'>
                        <button className="blue-button-1 px-6 mt-3 text-sm" onClick={() => setPopUp({ ...popUp, [order._id]: false })}>Close</button>
                      </div>
                    </div>
                    </Dialog>
                    </div>
                    
                )}
                {popUp[order._id] && order?.orderStatus=="cancelled" && (
                    <div>                   
                    <Dialog
                    padding=""
                    visible={popUp[order._id]}
                    setVisible={(isVisible) => setPopUp({ ...popUp, [order._id]: isVisible })}> 
                    <div className="overflow-y-auto h-[500px]">
                    <div className='flex justify-end'>
                        <button className="hollow-button mx-3 mt-3 text-sm"  onClick={() => setPopUp({ ...popUp, [order._id]: false })}>Close</button>
                     </div>
                        <OrderDetails setCurrent={setCurrent} order={order} />
                        <div className='flex justify-center mb-5'>
                        <button className="white-button mr-10 border-1 px-6 mt-3 text-sm" onClick={() => setPopUp({ ...popUp, [order._id]: false })}>Close</button>
                        {order?.paymentStatus=="paid"&&(<button className="blue-button-1 px-6 mt-3 text-sm" onClick={()=>{setPopUp({ ...popUp, [order._id]: false });newCancelRefundStatus="refund_initiated";markRefundStatus(order?._id,newCancelRefundStatus);setFetch('4')}} >
                        Initiate Refund
                      </button>)}
                      
                      </div>
                    </div>
                    </Dialog>
                    </div>
                    
                )}
                
                
                </tr>
              )})
            }
          </tbody>
        </table>
      </div>
      <PaginationDn totalOrders={totalOrders} resLength={resLength} />
    </div>
  )
}

function Filter ({ dropdownList, statusFilter,setStatusFilter }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const handleFilter = (data) =>{
     setStatusFilter(data)
     setShowDropdown(!showDropdown)
  }
  
  return (
    <div className="relative">
      <button style={{ textTransform: 'uppercase' }} onClick={() => setShowDropdown(!showDropdown)} className="border-1 relative text-gray-1200 md:w-40 w-full hover:shadow-md font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center" type="button">
        {statusFilter}
        <DownArrowIcon className='absolute right-3 text-gray-1400'/>
      </button>
      {
        showDropdown && <div id="dropdown" className="absolute top-10 z-10 bg-white border-1 rounded-lg shadow md:w-40 w-full">
          <div className="text-sm text-center cursor-pointer divide-y divide-x-0 divide-solid divide-[#00000033]">
            {
              dropdownList && dropdownList.map((data) => (
                <div key={data._id} onClick={()=>handleFilter(data.name)} className="hover:bg-gray-400 py-2" style={{ textTransform: 'uppercase' }}>{data.name}</div>
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}
export default Order