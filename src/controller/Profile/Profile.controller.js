import { ObjectId } from "mongodb";
import ProfileModel from "../../model/Profile.model.js";
class ProfileControler{
    async GetPofileAuth(id = null) {
        try{
            if(id == null){
              return  res.status(400).json({
                    msg:"Please check the account id"
                })
            }else{
                let profile = await ProfileModel.findOne({account_id: String(id)}).exec();
                if(profile == null){
                    return null;
                }else{
                  return profile;
                }
            }
        }catch(err){
           return null;
        }
    }
    async GetPofileAuthInClient(req,res,next) {
        try{
            const {id} = req.query;
            if(id == null){
              return  res.status(400).json({
                    msg:"Please check the account id"
                })
            }else{
                let profile = await ProfileModel.findOne({account_id:id}).exec();
                if(profile == null){
                    return res.status(400).json({
                        msg: "no profile for user"
                    })
                }else{
                    res.status(200).json(profile);
                }
            }
        }catch(err){
          return  res.status(500).json({
                err:err.error
            })
        }
    }
    // async createProfile(req,res,next){
    //     try{
    //         const newProfile = new ProfileModel(res.body);
    //         if(newProfile == null){
    //             return res.status(400).json({
    //                 msg:"please check data profile"
    //             })
    //         }else{
    //             const profile = await ProfileModel.create(newProfile);
    //             res.status(200).json(profile);
    //         }
    //     }catch(err){
    //         return res.status(501).json({
    //             msg:err.error
    //         })
    //     }
    // }
    async updateProfile(req,res,next){
        const {id} = req.query;
        const data = req.body;
        if(id == null || data){
            return res.status(400).json({
                msg:"please check id or data update"
            })
        }else{
            try{
                data.account_id = id;
                const uddateProfile = await ProfileModel.findOneAndUpdate({account_id:id},data,{
                    new:true,
                    runValidators:true
                }).exec();
                uddateProfile.updatedAt = Date.now();
                await uddateProfile.save();
                return res.status(200).json({
                    msg:"Update sucess",
                    updateProfile:uddateProfile
                })
            }catch(err){
                return res.status(500).json({
                    status:500,
                    msg:err
                })
            }
        }
    }
}
export default ProfileControler;