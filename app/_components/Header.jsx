'use client'

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";



const Header = () => {

    const path = usePathname();
    const { user, isSignedIn } = useUser();

    useEffect(() => {
        // console.log(path)
    })

    return (
        <div className="p-6 px-10 flex justify-between bg-white w-full fixed shadow-sm z-10 top-0">
            <div className="flex gap-12 items-center">
                <Image src={'/logo.svg'} width={150} height={150} alt="Logo" />
                <ul className="hidden md:flex gap-12">
                    <li className={`" font-medium text-sm cursor-pointer hover:text-primary" ${path === '/' && 'text-primary'}`}>Para alugar</li>
                    <li className="hover:text-primary font-medium text-sm cursor-pointer">Para comprar</li>
                    <li className="hover:text-primary font-medium text-sm cursor-pointer    ">Fale com um corretor</li>
                </ul>
            </div>
            <div className="flex gap-2">
                <Link href={'adicionar-imovel'}>
                <Button className="flex gap-2">
                    <Plus width={16} height={16} />
                    Anuncie seu imóvel
                </Button>
                </Link>
                {
                    isSignedIn ? <UserButton /> :
                    <Link href={'/sign-in'}>
                            
                        <Button variant="outline">
                            Login
                        </Button>
                    </Link>
                }




            </div>
        </div>
    );
}

export default Header;