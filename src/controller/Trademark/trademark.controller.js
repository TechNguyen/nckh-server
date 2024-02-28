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
}
export default TrademarkeControler;