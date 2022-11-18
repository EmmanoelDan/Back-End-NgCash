import { Request, Response } from "express";
import { FilteringService } from "./FilteringService";



class FilteringControler {
    constructor(private filteringService: FilteringService){}

    async handle(request: Request, response: Response){
        const {id} = request.user;

        const {date, transaction} = request.query;

        const filter = await this.filteringService.execute({
            date: date,
            id: id,
            transaction: transaction    
        })
        
        return response.json(filter)
    }

}

export {FilteringControler}