import { Bath, BedDouble, MapPin, Ruler, Search } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import GoogleMapsImport from './GoogleMapsImport'
import { Button } from '@/components/ui/button'

function Listing({listing, handleSearchAdress, searchedAdress}) {

    const [adress, setAdress] = useState();
  return (
    <div>
        <div className="p-3 flex gap-6">
            <GoogleMapsImport 
            selectedAdress={(v) => {searchedAdress(v); setAdress(v)}}
            setCoordinates={(v) => console.log(v)}
            />
            <Button 
            onClick={handleSearchAdress}
            className="flex gap-2"><Search/> Buscar</Button>
        </div>
        {adress&& <div className='p-3 my-5'>
                <p>Mostrando os {listing?.length} resultados encontrados</p>
            </div>}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {listing?.length>0 ? listing.map((house,index)=>(
                <div className='p-3 hover:border hover:border-primary cursor-pointer rounded-lg'>
                    
                    <Image src={house.listingImages[0].url}
                     width={800}
                     height={150}
                     className='rounded-lg object-cover h-[170px]'   
                        />

                    <div className='flex gap-2 mt-2 flex-col'>
                        <h2 className='font-bold text-xl'>R${house.price}</h2>    
                        <h2 className='flex gap-2 text-sm text-gray-400'> <MapPin className='w-4 h-4'/>{house.adress}</h2>
                        <div className="flex gap-2 mt-2  justify-between">
                            <h2 className='flex gap-2 p-2 w-full text-sm text-gray-500 bg-slate-200 rounded-md justify-center items-center'> <BedDouble className='w-4 h-4'/>{house.bedroom}</h2>
                            <h2 className='flex gap-2 p-2 w-full text-sm text-gray-500 bg-slate-200 rounded-md justify-center items-center'> <Bath className='w-4 h-4'/>{house.bathroom}</h2>
                            <h2 className='flex gap-2 p-2 w-full text-sm text-gray-500 bg-slate-200 rounded-md justify-center items-center'> <Ruler className='w-4 h-4'/>{house.area}</h2>
                        </div>
                    </div> 



                </div>
                
            ))
            : [1,2,3,4,5,6,7,8].map((item,index) => (
                <div key={index} className='h-[270px] bg-slate-200 w-full animate-pulse rounded-lg' >

                </div>
            ))
        }
        </div>
    </div>
  )
}

export default Listing