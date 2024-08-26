"use client"

import { MapPin } from 'lucide-react'
import React from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

function GoogleMapsImport({selectedAdress, setCoordinates}) {
  return (
    <div className="w-full flex  items-center ">
      <MapPin className='w-10 h-10 p-2 rounded-l-lg text-primary bg-slate-100'/>
      <GooglePlacesAutocomplete
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    selectProps={{
      placeholder: "Procure seu endereço",
      isClearable:true,
      className:'w-full',
      onChange:(place) => {
        selectedAdress(place.label);
        geocodeByAddress(place.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {

          setCoordinates({lat,lng})
       
      })
    }
    }}
/>
    </div>
    
  )
}

export default GoogleMapsImport