import * as express from 'express';
import LoginStore from '../util/redis-login-store';
import SignUpStore from '../util/redis-signup-store';
import { signUpJoiSchemaValidationMiddleware } from '../joi-validation/joi-sign-up';
const router = express.Router();

/**
 * write test cases
 * Create router - DONE
 * Store in redis signUp details in redis - DONE
 * Get login details from redis - DONE
 */
router.post('/',signUpJoiSchemaValidationMiddleware() , async function(req, res, next) {
    try {
        let {
            userName,
            passWord,
            firstName,
            lastName,
            country,
            email,
            gender
        }  = req.body;
        
        // @ts-ignore
        await LoginStore.set(userName, passWord);
        await SignUpStore.set({
            userName,
            passWord,
            firstName,
            lastName,
            country,
            email,
            gender
        });
            
        res.status(200)
            .send({
                    status:'success',
                    message:`${userName} persisted successfully`
                });
    } catch (error) {
        next(error);
    }
});

/**
 * For Dashboard.
 */
router.get('/all', async function(req, res, next){
    try {
        const signedUpUsersArray = await SignUpStore.getAll();
        console.log(signedUpUsersArray);
        res.status(200)
            .json({
                status:'success',
                data:signedUpUsersArray
            })
    } catch (error) {
        next(error);
    }
});

export default router;