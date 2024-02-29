import TrademarkModel from "../../model/Trademark.model.js";
class TrademarkeControler{
    async getAllTrademarke(req,res,next){
        try{
            var list = await TrademarkModel.find({}).exec();
            return res.status(200).json({
                msg: "Get all trademark successfully!",
                trademarks: list
            })
        }catch(err ){
            return res.status(500).json({
                msg: err.message,
            })
        }
    }
    async createTrademarke (req,res,next){
         try{
            const trademarkMD = new TrademarkModel(req.body);
            const rs = await TrademarkModel.create(trademarkMD);
            return res.status(200).json(rs);

        }catch(err){
            return res.status(500).json({
                msg: err.message,
            })
        }
    }
    async updateTrademarke(req,res,next){
        try{
            const id = req.query.id;
            const data = req.body;
            const updateTrade = await TrademarkModel.findByIdAndUpdate(id,data,{
                new:true,
                runValidators:true
            }).exec()
            updateTrade.updatedAt = Date.now();
            await updateTrade.save();
            res.status(200).json({
                msg:"Thêm thành công",
                new:updateTrade
            })

        }catch(err){
            return res.status(500).json({
                msg: err.message,
            })
        }
    }
    async deleteTrademark(req,res,next){
        try{
            const id = req.query.id;
            const trademark = await TrademarkModel.findById(id).exec();
            if(trademark==null){
                return res.status(202).json({
                    msg:"no exists trademark"
                })
            }
            await TrademarkModel.findByIdAndRemove(id,{
                new:true,
                runValidators:true
            }).exec();
            const tradeDelete = await TrademarkModel.findById(id).exec();
            if(tradeDelete==null){
                res.status(200).json({
                    msg:"Delete trademark Sucessfully"
                })
            }else{
                res.status(401).json({
                    msg: "Delete trademark Unsucessfully"
                })
            }
        }catch(err){
            return res.status(500).json({
                msg: err.message,
            })
        }
    }
}
export default TrademarkeControler;