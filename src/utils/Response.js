class ApiResponse{
    constructor(statusCode,data,mssage = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.mssage = mssage;
        this.sucess =statusCode < 400;
    }
}

export {ApiResponse}
