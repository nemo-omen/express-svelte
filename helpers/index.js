//pretty much completely lifted from:
//https://github.com/itsUnsmart/express-ws-boiler/blob/master/helpers/index.js

export const safeParseJSON = (message) => {
    try {
        return JSON.parse(message);
    } catch(error) {
        return null;
    }
}

export function generateError({error, reasons = []}) {
    return {
        type: 'error',
        message: error,
        code: error.split(' ').join('_').toLowerCase(),
        context_info: {
            errors: reasons.map(({reason, message, data, location}) => {
                return {
                    reason,
                    message,
                    data: data || null,
                    location,
                };
            })
        }
    };
}