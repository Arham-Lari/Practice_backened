import { ascyHandaler } from "../utils/AsynHandaller.js"

const registration = ascyHandaler (async (req,res) =>{
    res.status(200).json({
        massage : "ok",
    })
});

export { registration };
