import { AWSError } from 'aws-sdk';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';

import db from '../io';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

class UsersRepository {
  constructor() {  
  }  

  public async create(userData: ICreateUser): Promise<PromiseResult<PutItemOutput, AWSError>> {
    const { name, email, password } = userData;
    
    const user = await db.put({
      TableName: 'users',
      Item: {
        PK: 'user',
        SK: '123456',
        name,
        email,
        password
      }
    }).promise();  
    
    console.log('repository -> ', user);

    return user;
  }  
}

export default UsersRepository;


// public async findByEmail(email: string): Promise<User | undefined> {
  //   const user = await this.ormRepository.findOne({
  //     where: { email },
  //   });

  //   return user;
  // }

  // public async findAll({
  //   except_user_id,
  // }: IFindAllProvidersDTO): Promise<User[]> {
  //   let users: User[];

  //   if (except_user_id) {
  //     users = await this.ormRepository.find({
  //       where: {
  //         id: Not(except_user_id),
  //       },
  //     });
  //   } else {
  //     users = await this.ormRepository.find();
  //   }

  //   return users;
  // }
