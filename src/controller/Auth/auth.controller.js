import AccountUserModel from '../../model/AccountUser.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import ProfilleController from '../Profile/Profile.controller.js'
import ProfileModel from '../../model/Profile.model.js';
import RoleController from '../Role/role.controller.js';

const profile = new ProfilleController();
const role = new RoleController();
const generateToken = async (payload)=>{
    const {_id,username,roleId} = payload;
    const roleName = await role.GetById(roleId)
    const accessToken = await jwt.sign(
        {_id,username,roleId,roleName},
        process.env.ACCESS_TOKEN_SECRECT,
        {
            expiresIn: '5h'
        }
    )
    const refreshToken = await jwt.sign(
        {_id,username,roleId,roleName},
        process.env.REFREST_TOKEN_SECRECT,
        {
            expiresIn: '24h'
        } 
    )
    return {accessToken,refreshToken};
}
    const updateRefreshToken = async (id,refreshToken)=>{
        try{
            var user =await AccountUserModel.findById({ _id: id }).exec();
            if(user == null){
               return null;
            }else{
                user.refreshToken = refreshToken;
                await user.save();
                return user;
            }
        }catch(err){
           console.log(err)
        }
    }

class authController {
    async signUp(req,res, next) {
        try {
            let {username,password} = req.body
            let roleId = req.body.roleId || await role.GetByUser("user")
            let hashpass = await bcrypt.hash(password, 13);
            let user = await AccountUserModel.find({ username: username})
            if(user.length != 0) {
                return res.status(400).json({
                    statuscode: 400,
                    message: "Username has been already !"
                })
            } else {
                
                const acc = await AccountUserModel.create({
                    username: username,
                    password: hashpass,
                    roleId: roleId
                })
                if(acc != null) {
                    const profile = new ProfileModel({
                        _id: acc._id
                    })
                    await ProfileModel.create(profile)
                    return res.status(200).json({
                        statuscode: 200,
                        message: "Create account successfully!"
                    })
                }         
            }
        } catch(err) {
            return res.status(404).json({
                status: 500,
                message: err.message
            })
        }
    }
    async signIn(req,res,next) {
        try {
            let {username, password} = req.body;
            const account = await AccountUserModel.findOne({
                username: username
            }).exec();
            if(account == null) {
                return res.status(203).json({
                    statuscode: 401,
                    message: "Unauthorized!"
                }) 
            }else {
                let check = await bcrypt.compare(password, account.password);
                if(check) {
                    const roleIds = Boolean(account.roleId) ? account.roleId : await role.GetByUser("user");
                    const roleName = await role.GetById(roleIds)
                    const tokens = await generateToken(account)
                    let profileUser = await profile.GetPofileAuth(account._id);
                    await updateRefreshToken(account._id, tokens.refreshToken)
                    if(profileUser) {
                        return res.status(200).json({
                            statuscode: 200,
                            data: {
                                accesstoken: tokens.accessToken,
                                roleName: roleName.roleName
                            },

                            message: "Successfully!"
                        })
                    } else {
                        return res.status(200).json({
                            statuscode: 200,
                            message: "Successfully!"
                        })
                    }
                } else {
                    res.status(401).json({
                        statuscode:  200,
                        message: "Password not correcct!",
                    })
                }
            }
        } catch(err) {
            return res.status(500).json({
                status: 500,
                message: err.error
            })
        } 
    }
    async getMe(req,res,next){
        try{
            const user_id = req.user_id;
            const user = await AccountUserModel.findById(user_id).exec();
            if(user){
                res.status(200).json({
                    username:user.username,
                    id:user._id
                })
            }else{
                res.status(204).json({
                    msg:"No user"
                })
            }
        }catch(err){
            return res.satus(500).json({
                err:err.error
            })
        }
    }
    async token(req,res,next){
        try{
            const refreshToken = req.body.refreshToken;
            if (!refreshToken) return res.sendStatus(401);
            const user =await AccountUserModel.findOne({refreshToken:refreshToken});
            if(!user) return res.sendStatus(401);
            const tokens = await generateToken(user);
            jwt.verify(refreshToken,process.env.REFREST_TOKEN_SECRECT,(err,user)=>{
                if(err){
                    res.sendStatus(402);
                }
                res.status(200).json({
                    msg:"Success",
                    accessToken: tokens.accessToken
                })
            })
        }catch(err){
            return res.satus(500).json({
                err:err.error
            })
        }
    }
    async ResetPassWord(req,res,next) {
        try {
            const {username,confirnPass,newPassword} = req.body;
            if(confirnPass != newPassword) {
                return res.status(204).json(responStatus("New password not match"))
            }
            const user = await AccountUserModel.find({
                username: username,
            }).exec();

            if(user == null) {
                return res.status(203).json({
                    msg: "Not exits user"
                })
            } else {
                let hashpass = await bcrypt.hash(newPassword, 13);
                const userUpdate = await AccountUserModel.findOneAndUpdate({
                    username: username,
                }, {password: hashpass}, {new : true}).exec();
                return userUpdate != null ? res.status(200).json({
                    msg: "Reset password successfully"
                }) : res.status(204).json({
                    msg: "Reset password unsuccessfully"
                })
            }
        } catch (error) {
            return res.status(500).json({
                msg: error.message,
                status: 500
            })
        }
    }
    async GetAllAccount(req,res,next) {
        try {
            const data = await AccountUserModel.find({deleted: false}).exec();
            return res.status(200).json({
                msg: "Get all account successfully",
                data: data,
                status: 200
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message,
                status: 500
            })
        }
    }
}
export default authController