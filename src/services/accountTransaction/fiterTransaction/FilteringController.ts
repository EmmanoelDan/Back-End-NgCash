import { Request, Response } from "express";
import { FilteringService } from "./FilteringService";



class FilteringControler {
    constructor(private filteringService: FilteringService){}

    async handle(request: Request, response: Response){
        try {
            const {id} = request.user;

            const {date, transaction} = request.query;

            const filter = await this.filteringService.execute({
                date: date,
                id: id,
                transaction: transaction    
            })
        
            return response.json(filter)
        } catch (error) {
            return response.json({sucess: false, error: error.message})
        }
        
    }

}

export {FilteringControler}