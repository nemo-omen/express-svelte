export function generateSocketResponse(requestMethod, responseStatus, responseData) {
    let responseMessage = {};
    if(responseStatus === 'ok') {
        responseMessage = {
            ok: true,
            method: requestMethod,
            data: responseData
        }
    }else{
        responseMessage = {
            ok: false,
            method: requestMethod,
            data: responseData
        }
    }
    return JSON.stringify(responseMessage);
}