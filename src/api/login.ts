import * as express from 'express';
import login from '../util/redis-login-store';
import {generateAccessToken} from '../util/get-access-token';
import * as httpStatus from 'http-status-codes';
import { loginJoiSchemaValidationMiddleware } from '../joi-validation/joi-login';
import Login from '../util/redis-login-store';
const router = express.Router();

/**
 * Saving user login information into redis.
 */
router.post('/',loginJoiSchemaValidationMiddleware() , async function(req, res, next) {
    try {
        let {
            userName,
            passWord
        }  = req.body;
        
        let userSavedPassWord = await login.get(userName);

        if(passWord === userSavedPassWord ){
            res.status(200)
                .send({
                    status:'success',
                    accessToken: generateAccessToken(userName,passWord)
                });
        }
        else {
            res.status(httpStatus.FORBIDDEN)
                .send({
                    status:'failure'
                });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * For Dashboard.
 */
router.get('/', async function(req, res, next){
    try {
        const loginAndPasswordArray = await Login.getAll();
        console.log(loginAndPasswordArray);
        res.status(200)
            .json({
                status:'success',
                data:loginAndPasswordArray
            })
    } catch (error) {
        next(error);
    }
});

export default router;