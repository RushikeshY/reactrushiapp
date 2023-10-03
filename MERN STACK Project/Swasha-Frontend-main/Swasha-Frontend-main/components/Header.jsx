
import { LogoForHeader1, LogoForHeader2, Arrow, WhiteArrow2,LeftArrow } from './svg'
import { store } from '../redux/store'
import { useDispatch, useSelector } from "react-redux";
import { Router, useRouter } from 'next/router'
import { isUserLoggedIn } from "../util/data";
import React, { useEffect, useRef, useState } from "react";
import {
    getAllAddresses,
    getCartItems,
    getWishlistItems,
    logout,
    makeRequest,
    requestEmailVerification,
  } from "../util/ApiClient";
export default function Header({page}) {
    const router = useRouter();
    const user = useSelector((s) => s.user);
    let requested = false;
    const wishlist = useSelector((x) => x.wishlist);
    const cart = useSelector((x) => x.cart);
    useEffect(() => {
        if (requested) return;
        requested = true;
        if (isUserLoggedIn()) {
        makeRequest(getCartItems);
        makeRequest(getAllAddresses);
        makeRequest(getWishlistItems);
        }
    }, [user]);
    return (
        <div className="borderH-2 sticky top-0 z-10 bg-white">
        <div className='flex flex-row mb-2 '>
            {(page!=="Successful") &&<div className='mt-9 ml-4' onClick={()=>{window.history.back()}}><LeftArrow/></div>}
            <div className="flex flex-row cursor-pointer" onClick={() => { if(page==="Successful") router.replace("../")}}>
                <div className='mt-6 mx-5'>
                    <LogoForHeader1 />
                </div>
                <div className='mt-8'>
                    <LogoForHeader2 />
                </div>
            </div>

            <div className="hidden md:flex flex-row ml-14 relative w-full mt-8">
                <div className='absolute'>
                    <WhiteArrow2 />
                    <div className='absolute top-2.5 left-11'>Sign In</div>
                </div>
                <div className='absolute left-[9.5rem]'>
                    <Arrow color={page==="Address"?'Blue':'Gray'} />
                    <div className='absolute top-2.5 left-14'><span className={page==="Address"?'text-white':''}>Delivery</span></div>                    
                </div>
                <div className='absolute left-[19rem]'>
                    <Arrow color={page==="Review"?'Blue':'Gray'} />
                    <div className='absolute top-2.5 left-10'><span className={page==="Review"?'text-white':''}>Review Order</span></div>  
                </div>
                <div className='absolute left-[28.5rem]'>
                    <Arrow color="Gray" />
                    <div className='absolute top-2.5 left-14'>Payment</div>  
                </div>
                <div className='absolute left-[38rem]'>
                    <Arrow color={page==="Successful"?'Blue':page==="Fail"?'Red':'Gray'} />
                    <div className='absolute top-2.5 left-9'><span className={page==="Successful" || page === "Fail"?'text-white':''}>{page==="Fail"?"Order Fail":"Complete Order"}</span></div>  
                </div>
            </div>
            </div>
        </div>
    )
}