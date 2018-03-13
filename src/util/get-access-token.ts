'use strict';

/**
 * Using JsonWebtoken to keep access
 * token in user end, retriving from
 * client.
 */
import * as httpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import parseToken from 'parse-access-token';
import * as bluebird from 'bluebird';

bluebird.promisifyAll(jwt);

const secret = '@CCe$$';

export function parseAccessToken(req) {
	return parseToken(req);
}

export function generateAccessToken (userName, passWord) {
    if (userName && passWord) {
        const token = jwt.sign({
            userName,
            passWord
        }, secret, {
            expiresIn: 24 * 60 * 60 // In seconds
        });
        return token
    } else {
        throw new Error(httpStatus.getStatusText(httpStatus.FORBIDDEN));
    }
};


export async function checkAccess (req) {
   try {
        const token = parseAccessToken(req);
        if (token) {
            return await jwt.verify(token, secret);
        } else {
            throw new Error(httpStatus.getStatusText(httpStatus.FORBIDDEN));
        }
   } catch (error) {
       throw error;
   }
}