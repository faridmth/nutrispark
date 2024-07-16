"use client"
import { IFoodReduced,IFood } from "./types"
import { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useRouter } from "next/navigation"

export function Home() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [value, setValue] =useState("")
  const [foods,setFoods] = useState<IFoodReduced[]>([])
  const [isLoadnig,setIsLoading]=useState<boolean>(true)

  async function fetchAll(){
    try{
      const response = await fetch('/api/all')
      const data = await response.json()
      const RedFoods:IFoodReduced[] = data.map((food:IFood)=>{
        return   {
          value: food.name.toLocaleLowerCase().replace(/ /g,'-'),
          label: food.name,
        }
      })
      setFoods(RedFoods)
    }catch(err){
      console.log(err)
    }finally{
      setIsLoading(false)
    }
    
  }
  useEffect(()=>{
    const initilize=async() => {
      await fetchAll()
      setIsLoading(false)
    }
    initilize()
  },[])

  return (
    <>
    {
      isLoadnig?(
        <div className="h-screen flex justify-center items-center w-screen">Loading...</div>
      ):(
        <div className="h-screen flex flex-col justify-center items-center w-screen p-2">
          <div>
          <h1 className="text-5xl mb-5  text-center">Welcome to <span className="title_colored">Nutrispark</span></h1>
          <p className=" mb-7  text-center">Discover the nutritional values of your favorite foods, Use the search below to <br /> get started</p>

          </div>
          <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] md:w-[350px] justify-between"
          >
            {value
              ? foods.find((food) => food.value === value)?.label
              : "Select food..."}
            <ChevronsUpDown className="ml-2 h-4h w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0">
          <Command>
            <CommandInput placeholder="Search food..." />
            <CommandEmpty>No food found.</CommandEmpty>
            <CommandList className="max-h-[210px]">
              {foods.map((food) => (
                <CommandItem
                  key={food.value}
                  value={food.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    router.push(`/foods/${currentValue}`)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === food.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {food.label}
                </CommandItem>
              ))}

            </CommandList>
          </Command>
        </PopoverContent>
          </Popover>
        </div>
      )
    }
    </>
  )
}

export default Home
