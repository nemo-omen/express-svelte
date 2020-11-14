export function generateRestResponse(responseStatus, responseData) {
    let responseMessage = {};
    if(responseStatus === 'ok') {
        responseMessage = {
            ok: true,
            data: responseData
        }
    }else{
        responseMessage = {
            ok: false,
            data: responseData
        }
    }
    return JSON.stringify(responseMessage);
}