import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';

import CreateUserService from '../../services/CreateUserService';

const createClient: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { name, email, password } = event.body;
  
  const createUser = new CreateUserService();
  
  const newUser = await createUser.execute({ name, email, password});

  console.log('newUser -> ', newUser);

  return formatJSONResponse({
    message: { 
      name, 
      email
    }
  });
}

export const main = middyfy(createClient);