import { foods } from "@/app/data";

export function GET(){
    return Response.json(foods)
}