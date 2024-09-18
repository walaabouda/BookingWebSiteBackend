export const createError = (status, message) =>
{
    const err = new Error();
    err.staus = status;
    err.message = message;
    return err;
};
