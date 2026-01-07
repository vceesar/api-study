export function badRequest(message = undefined) {
    return {
        statusCode: 400,
        message,
    }
}

export function validRequest(message = undefined) {
    return {
        statusCode: 200,
        message,
    }
}

export function notFound(message = undefined) {
    return {
        statusCode: 404,
        message,
    }
}

export function created(message = undefined) {
    return {
        statusCode: 201,
        message: message.id,
    }
}
