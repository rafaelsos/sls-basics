import { AWSError } from 'aws-sdk';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';

import IUsersRepository from '../repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(   
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<PromiseResult<PutItemOutput, AWSError>> {       
    const usersRepository = new IUsersRepository;

    const user = await usersRepository.create({
      name,
      email,
      password
    })

    console.log('user service -> ', user)
    
    return user;
  }
}

export default CreateUserService;