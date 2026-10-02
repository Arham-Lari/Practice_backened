import { AsynHandaller } from "../utils/AsynHandaller.js"

const registration = AsynHandaller( async (req,res) =>{
    res.status(200).json({
        massage : "ok",
    })
});

export { registration };
