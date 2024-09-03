'use client'

import { supabase } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import Listing from './Listing'

function ListingMapView({type}) {

    const[listing, setListing] = useState([])
    const[searchedAdress, setSearchedAdress] = useState()

    useEffect(()=>{
        getListingView()
    },[])

    const getListingView = async () =>
    {
        const {data,error} = await supabase
        .from('house')
        .select(`*, listingImages(
            url,
            listing_id
            )`)
            .eq('active', true)
            .eq('type', type)   
            .order('id', {ascending:false})

            if(data){
                setListing(data)
                console.log(data)
            }
            if(error){
                alert("Error")
            }
    }

    const handleSearchAdress = async () => {
        

        const searchedAdressValue = searchedAdress?.value?.structured_formatting?.main_text

        console.log(searchedAdressValue)

        const {data,error} = await supabase
        .from('house')
        .select(`*, listingImages(
            url,
            listing_id
            )`)
            .eq('active', true)
            .eq('type', type)   
            .like('adress','%'+searchedAdressValue+'%')
            .order('id', {ascending:false})

            if(data){
                setListing(data)
                
            }
            if(error){
                alert("Error")
            }
    }

  return (
    <div className='px-10 grid grid-cols-1 md:grid-cols-2'>
        <div>
            <Listing listing={listing} handleSearchAdress={handleSearchAdress} searchedAdress={(v) => setSearchedAdress(v)}/>
        </div>
        <div>
            Map
        </div>
    </div>
  )
}

export default ListingMapView