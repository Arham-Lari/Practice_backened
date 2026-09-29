
export const Connection = (fn) => {
    (req,res,next)=>{
        Promise.resolve(()=>
            fn(req,res,next)
        ).catch((err)=>{
                next(err);
            })
    }
}
