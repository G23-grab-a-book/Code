'use client'
import { RequiredField } from "@/app/helpers/validation";
import {Button, Form, message, Select} from "antd"
import axios from "axios";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

//get path
//get props

interface annuncioType {
    title: string;
    author: string;
    category: string;
    ISBN: string;
    price: number;
    condition: string;
    seller: string;
}
function ViewAnnuncio () {
    //const router = useRouter();
    return (
        <div>
            <div className="">
                <h2 className="Title">prova</h2>
            </div>
        </div>

    )
}
export default ViewAnnuncio