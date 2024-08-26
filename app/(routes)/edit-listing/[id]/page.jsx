'use client'
import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { Formik } from 'formik'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { useUser } from '@clerk/nextjs'





function EditListing({params}) {

    // const params = usePathname()
    const {user} = useUser();
    const router = useRouter();
    const[listagem,setListagem] = useState([])
    useEffect(()=> {
        console.log(params.id)
        user&&verifyUser()
    },[user])


    const verifyUser = async() => {
        const { data, error } = await supabase
        .from('house')
        .select('*')
        .eq('createdBy', user?.primaryEmailAddress.emailAddress)
        .eq('id', params.id)
        if(data){
            setListagem(data[0])
        }
        if(data?.length<=0){
            router.replace('/')
        }
    }

const publishHandler = async(valuesForm) =>{

    const { data, error } = await supabase
    .from('house')
    .update(valuesForm)
    .eq('id', params.id)
    .select()

    if(data){
        
        // console.log(data)
    }
        
}


    return (
        <div>

            <div className="px-10 md:px-36 my-10">
                <h2 className="font-bold text-2xl">Adicione os detalhes do seu imóvel</h2>
                <Formik
                    initialValues={{
                        type:"",
                        propertyType:""
                    }}
                    onSubmit={(values)=> {
                        console.log(values)
                        publishHandler(values)
                    }}
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit
                        }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="p-8 rounded-xl shadow-md gap-7 mt-6 grid">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    <div className='flex flex-col gap-2'>
                                        <h2 className='text-md font-semibold text-slate-500'>Vender ou Alugar?</h2>
                                        <RadioGroup defaultValue="Vender" onValueChange={(e) => values.type = e}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Vender" id="Vender" />
                                                <Label htmlFor="Vender">Vender</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Alugar" id="Alugar" />
                                                <Label htmlFor="Alugar">Alugar</Label>
                                            </div>
                                        </RadioGroup>

                                    </div>
                                    <div className="flex flex-col gap-2">

                                        <h2 className='text-md font-semibold text-slate-500'>Qual é o tipo da sua propriedade?</h2>
                                        <Select onValueChange={(s) => values.propertyType = s}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Como é a propriedade?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Casa">Casa</SelectItem>
                                                <SelectItem value="Apartamento">Apartamento</SelectItem>
                                                <SelectItem value="Cobertura">Cobertura</SelectItem>
                                                <SelectItem value="Fazenda">Fazenda</SelectItem>
                                                <SelectItem value="Sítio">Sítio</SelectItem>
                                                <SelectItem value="Chacrá">Chacrá</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </div>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-slate-500">Quartos</h2>
                                        <Input placeholder="Ex.2" name="bedroom" type="number" defaultValue={listagem?.bedroom} onChange={handleChange} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-slate-500">Banheiros</h2>
                                        <Input placeholder="Ex.2" name="bathroom" type="number" defaultValue={listagem?.bathroom} onChange={handleChange}/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-slate-500">Ano de costrução</h2>
                                        <Input placeholder="Ex.1985" name="builtIn" type="number" defaultValue={listagem?.builtIn} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-slate-500">Vagas de estacionamento</h2>
                                        <Input placeholder="Ex.2" name="parking" type="number" defaultValue={listagem?.parking} onChange={handleChange} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-slate-500">Tamanho total</h2>
                                        <Input placeholder="Ex. 190m²" name="lotSize" type="number" defaultValue={listagem?.lotSize} onChange={handleChange} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-slate-500">Tamanho área construída</h2>
                                        <Input placeholder="Ex. 200m²" name="area" defaultValue={listagem?.area} type="number"onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-slate-500">Valor do imóvel</h2>
                                        <Input placeholder="R$ 500.000,00" name="price" type="number" defaultValue={listagem?.price} onChange={handleChange} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-slate-500">Valor do aluguel mensal</h2>
                                        <Input placeholder="R$ 2.000,00" name="hoa" type="number" defaultValue={listagem?.hoa} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-10">
                                    <Textarea placeholder="Descrição do local" name="description" defaultValue={listagem?.description} onChange={handleChange} />
                                </div>
                                <div className="flex gap-7 justify-end">
                                    <Button type="submit" className=" border-primary "
                                    >
                                        {false ? <Loader className='animate-spin' /> : 'Cdastrar'}</Button>
                                </div>
                            </div>
                        </form>
                )}
                </Formik>
            </div>

        </div>
    )
}

export default EditListing