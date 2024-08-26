'use client'

import GoogleMapsImport from '@/app/_components/GoogleMapsImport'
import { Button } from '@/components/ui/button'

import { useUser } from '@clerk/nextjs';
import { supabase } from '@/utils/supabase/client';
import { Loader } from 'lucide-react';
import React, { useState } from 'react'
import { Toaster } from 'sonner';
import { useRouter } from 'next/navigation';

function AdicionarImovel() {

  const [selectedAdress, setSelectedAdress] = useState();
  const [coordinates, setCoordinates] = useState();
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {user} = useUser()

  const nextHandler = async () => {
     setLoading(true);
     const createdBy = (user?.primaryEmailAddress.emailAddress)
    const { data, error } = await supabase
    .from('house')
    .insert([
 
      { adress: selectedAdress , coordinates: coordinates , createdBy:`${createdBy}` },
    ])
    .select();

    if(data){
      setLoading(false)
      router.replace('edit-listing/'+data[0].id)
      // Toaster("Endereço adicionado com sucesso")
    }
    if(error){
      setLoading(false)
      // Toaster("Aconteceu algo errado")
    }
            
  }

  return (
    <div className='p-10 flex flex-col gap-5 items-center justify-center'>
      <h2 className='font-bold text-2xl'>Adicione o seu imóvel</h2>
      <div className='p-5 rounded-lg border shadow-md flex flex-col gap-5'>
        <h2 className='text-gray-500'>
          Insira o endereço do imóvel que deseja adicionar
        </h2>
          <GoogleMapsImport
            selectedAdress={(value) => setSelectedAdress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button
          disabled={ !selectedAdress || !coordinates || loading}
            onClick={nextHandler}
          >
            {loading? <Loader className='animate-spin'/> : 'Próximo'}</Button>
      </div>
        
        

        
    </div>
    
  )
}

export default AdicionarImovel