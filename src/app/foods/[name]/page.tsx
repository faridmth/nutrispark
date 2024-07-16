'use client'
import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell,ResponsiveContainer } from 'recharts';
import { Undo2 } from 'lucide-react';
import { useState,useEffect, use } from "react"
import { useRouter } from 'next/navigation';
import { IFood } from "@/app/types"
import { IMacronutrientData } from '@/app/types';
import Image from 'next/image';
import minerals from '/public/minerals.png';
import vitamins from '/public/vitamins.png';
import calories from '/public/calories.png'
const page = ({params}:{params:{name:string}}) => {

    const router = useRouter()
    const COLORS = ['#f28a04', '#4f78ec', '#f8200d',"green",'#E04F23'];
    const[data,setData]=useState<IFood | null>(null)
    const[macroNutriment,setMacroNutriment]=useState<IMacronutrientData[]>([])
    const[isLoading,setIsLoading]=useState<boolean>(true)
    async function fetchData() {
        try{
            const fetchedData =await fetch(`/api/foods/${params.name}`)
            const foodDt =await fetchedData.json()
            // all data
            setData(foodDt)
            // set  macroNutriment
            setMacroNutriment([
                { name: 'carbohydrates', value: foodDt.carbohydrates },
                { name: 'protein', value: foodDt.protein },
                { name: 'fat', value: foodDt.fat },
                { name: 'fiber', value: foodDt.fiber },
                { name: 'sugar', value: foodDt.sugar },
            ])

        }catch(err){
            console.log(err)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        const initilize= async ()=>{
            fetchData()
        }
        initilize()
    },[])

  return (
    <>
    {
        !isLoading && macroNutriment && data ? (
            <div>
                <div>
                    <Undo2 className='cursor-pointer m-7 ' onClick={()=>router.back()}/>
                    <h1 className='ml-7 text-2xl'>{data.name.toUpperCase()}</h1>

                </div>
                <div className=" w-screen flex flex-col sm:flex-row" >
                    <div className='md:w-1/2 lg:w-1/3  sm:min-w-96 ' >
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={macroNutriment}
                                    cx={'50%'}
                                    cy={'50%'}
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {macroNutriment.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        
                    </div>
                    <div className='w-full flex flex-col items-center sm:items-start  '>
                        <h1 className='md:text-xl mb-2'>Nitritional information per 100g</h1>
                            <div className='w-2/3 sm:4/5 bg-gray-700 p-2 rounded-sm'>
                                <div className='flex w-fit items-center mr-2'>
                                    <div className='w-3 h-3 bg-[#f28a04] mr-1'></div>
                                    <p>carbohydrates</p>
                                </div>   
                                <div className='flex w-fit items-center mr-2'>
                                    <div className='w-3 h-3 bg-[#4f78ec] mr-1 align-start'></div>
                                    <p>protein</p>
                                </div>   
                                <div className='flex w-fit items-center'>
                                    <div className='w-3 h-3 bg-[#f8200d] mr-1'></div>
                                    <p>fat</p>
                                </div>
                                <div className='flex w-fit items-center'>
                                    <div className='w-3 h-3 bg-[green] mr-1'></div>
                                    <p>fiber</p>
                                </div> 
                                <div className='flex w-fit items-center'>
                                    <div className='w-3 h-3 bg-[#E04F23] mr-1'></div>
                                    <p>sugar</p>
                                </div>   
                            </div>
                            <div className='w-2/3 sm:4/5 mt-5'>
                                {data.vitamins&&<div className='flex items-center'>
                                    <Image src={vitamins} alt="vitamins" width={30} height={30}></Image>    
                                    <p className='ml-2'>
                                        vitamins : 
                                        {
                                            data.vitamins.map((vitamin)=>{
                                                return (<span className='ml-1'>{vitamin}</span>)
                                            })
                                        }
                                    </p>
                                </div>}
                                {data.minerals&&<div className='flex items-center mt-2'>
                                    <Image src={minerals} alt="minerals" width={30} height={30}></Image>    
                                    <p className='ml-2'>
                                        minerals : 
                                        {
                                            data.minerals.map((miniral)=>{
                                                return (<span className='ml-1'>{miniral}</span>)
                                            })
                                        }
                                    </p>
                                </div>}
                                {data.calories&&<div className='flex items-center mt-2'>
                                    <Image src={calories} alt="minerals" width={30} height={30}></Image>    
                                    <p className='ml-2'>calories: {data.calories}cal</p>
                                </div>}
                            </div>
                    </div>
                </div>
            </div>
        ):(
            <div className="h-screen flex justify-center items-center w-screen">Loading...</div>
        )
    }
    </>
  )
}

export default page
