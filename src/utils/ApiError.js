class Apierror extends Error{
    constructor({
        statuscode,
        massage = "something went wrong",
        error =[],
        stack ="",
    }){
        super(massage)
        this.statuscode = statuscode;
        this.data = null;
        this.message = massage;
        this.success = false;
        this.errors =error;
        if (stack){
            this.stack = stack;
        }else {
            Error.captureStackTrace(this,this.constructor);
        }
    }

}

export {Apierror}
