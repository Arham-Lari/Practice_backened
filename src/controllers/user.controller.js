import { ascyHandaler } from "../utils/AsynHandaller.js"

const registration = ascyHandaler (async (req,res) =>{
    console.log("reciveing the request", req.body)
    
    res.status(200).json({
        message : "accepted carefully"
    })
});

export {registration}
