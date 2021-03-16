import {Request, Response} from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { UsersRepository } from "../repositories/UsersRepository"
import * as yup from 'yup';

class UserController {

    async create(request: Request, response: Response){
            const {name, email} = request.body;

            let schema = yup.object().shape({
                name: yup. string().required("Nome é obrigatorio"),
                email: yup.string().email().required("Email incorreto"),
            });

         //   if(!(await schema.isValid(request.body))){
         //       return response.status(400).json({error: "Validation Failed!"})
         //   }

            try{
                await schema.validate(request.body, {abortEarly:false});

            }
            catch(err){
                return response.status(400).json({error: err})
                
            }
            
const usersRepository = getCustomRepository(UsersRepository);

const userAlreadyExists = await usersRepository.findOne({
    email
});

if(userAlreadyExists){
    return response.status(400).json({

       error: "User already exists!", 
        
    });
}

const user = usersRepository.create({
 name, email
})

await usersRepository.save(user);

return response.json(user);
    }
}

export {UserController}