import AccountUserModel from '../model/AccountUser.model.js'
import bcrypt from 'bcrypt'
class authController {
    async signUp(req,res, next) {
        try {
            let {username,password} = req.body
            console.log(username,password);   
            let hashpass = await bcrypt.hash(password,13);
            let user = await AccountUserModel.find({ username: username})
            if(user.length != 0) {
                return res.status(400).json({
                    statuscode: 400,
                    message: "Username has been yet!"
                })
            } else {
                await AccountUserModel.create({
                    username: username,
                    password: hashpass
                })
                //check account
                if((await AccountUserModel.find({username: username})).length > 0) {
                    return res.status(200).json({
                        statuscode: 200,
                        message: "Create account successfully!"
                    })
                }         
            }
        } catch {
            return res.status(404).json({
                status: 500,
                message: "Error when creare new account"
            })
        }
    }
}
export default authController