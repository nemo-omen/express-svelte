import {example} from './example.js';
import { get, getOne, post, put, destroy } from './rest.js';
export const methods = {
    example: example,
    post: post,
    put: put,
    get: get,
    getOne: getOne,
    destroy: destroy
};