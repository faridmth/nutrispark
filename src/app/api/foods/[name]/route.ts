import { foods } from "@/app/data";

export function GET(
    request:Request,
    {params}:{params:{name:string}}
){
   const index = foods.findIndex((food)=>params.name===food.name.toLocaleLowerCase().replace(/ /g,'-'))
   if(index!==-1){
    return new Response(JSON.stringify(foods[index]),{
        headers:{
            'Content-Type':"application/json"            
        },
        status:200
    })
   }else{
    console.log("not found")
        return new Response(JSON.stringify({error:"food not Found"}),{
            headers:{
                'Content-Type':"application/json"            
            },
            status:404
        })
   }
}



