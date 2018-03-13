import redisClient from '../util/get-redis-client';

interface SignUpShape {
    userName: string;
    passWord: string;
    firstName: string;
    lastName: string;
    country: string;
    email: string;
    gender: string;
}

interface GetAll {
    key: string;
    value: SignUpShape;
}

class SignUp {
    private static key:string = 'signUp';
    static async get(userName:string):Promise<SignUpShape> {
        // @ts-ignore
        // because we used bluded in redisClient file, we have to alter the 
        // index.d file to get this resolved.
        const response = await redisClient.hgetAsync(SignUp.key,`${SignUp.key}-${userName}`);
        return JSON.parse(response);
    }

    static async set({
        userName,
        passWord,
        firstName,
        lastName,
        country,
        email,
        gender
    }:SignUpShape):Promise<boolean> {
        // password should be in HM256
        const userData = JSON.stringify({userName,passWord,firstName,lastName,country,email,gender});
        // console.log(`set userData : `,userData);
        // @ts-ignore
        return await redisClient.hsetAsync(SignUp.key,`${SignUp.key}-${userName}`,userData);
    }

    static async getAll():Promise<Array<GetAll>> {
        // @ts-ignore
        const keysInHashSet = await redisClient.hkeysAsync(SignUp.key);
        // console.log('SignUp getAll : ',keysInHashSet);
        if(keysInHashSet.length){
            // @ts-ignore
            const valuesInHashSet = await redisClient.hmgetAsync(SignUp.key,keysInHashSet);
            return keysInHashSet.map((key,i) => {
                return {
                    key,
                    value: JSON.parse(valuesInHashSet[i])
                }
            }); 
        }
        return [];
    }
}

export default SignUp;