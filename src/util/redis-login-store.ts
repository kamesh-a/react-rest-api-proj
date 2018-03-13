import redisClient from '../util/get-redis-client';
interface Result {
    value?: string|Error;
}

interface GetAll {
    key: string;
    value: string;
}

class Login {
    private static key:string = 'login';
    static async get(userName:string):Promise<Result> {
        // @ts-ignore
        // because we used bluded in redisClient file, we have to alter the 
        // index.d file to get this resolved.
        return await redisClient.hgetAsync(Login.key,`${Login.key}-${userName}`);;
    }

    static async set(userName:string,passWord:string):Promise<Result> {
        console.log(userName,passWord);
        // @ts-ignore
        return await redisClient.hsetAsync(Login.key,`${Login.key}-${userName}`,passWord);
    }

    static async getAll():Promise<Array<GetAll>> {
        // @ts-ignore
        const keysInHashSet = await redisClient.hkeysAsync(Login.key);
        if(keysInHashSet.length){
            // @ts-ignore
            const valuesInHashSet = await redisClient.hmgetAsync(Login.key,keysInHashSet);
            return keysInHashSet.map((key,i) => {
                return {
                    key,
                    value: valuesInHashSet[i]
                }
            }); 
        }
        return [];
    }
}

export default Login;