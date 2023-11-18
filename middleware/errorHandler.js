import { CustomAPIErr } from "../errors/custom-errors.js"

const errorHandlerMw = (err, req, res, next) => {
    if(err instanceof CustomAPIErr)
    {
        return res.status(err.statusCode).json({msg:err.message}) 
    }
    return res.status(500).json({msg:'something went wrong please try again'})
}

export default errorHandlerMw