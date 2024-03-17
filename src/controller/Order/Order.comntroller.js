import { ObjectId } from "mongodb";
import OrderModel from "../../model/Order.model.js";

class OrderController {
    async getOrderByIdUser(req, res, next) {
        try {
            const idUser = req.user_id;
            console.log(typeof idUser);
            let data = await OrderModel.aggregate([
                {
                    $match: {
                        userId: idUser
                    },
                }
                
            ]);
    
            if (!data || data.length === 0) {
                res.status(404).json({
                    msg: "No order found for the user"
                });
            } else {
                res.status(200).json({
                    msg: "Get order success",
                    data: data
                });
            }
        } catch (error) {
            res.status(500).json({
                msg: "Error",
                err: error.message
            });
        }
    }
    async createOrder(req,res,next){
        try{
            const data = req.body;
            
            if(!data){
                return res.status(401).json({
                    msg:"Please enter productid, quantity,price"
                })
            }
            else{
                const promises = data.map(docData => {
                    const doc = new OrderModel(docData);
                    return doc.save();
                });
                
                // Chờ tất cả các promise hoàn thành
                Promise.all(promises)
                    .then(savedDocuments => {
                        res.status(200).json({
                            msg:"success",
                            data:savedDocuments
                        })
                    })
                    .catch(error => {
                        console.error('Error saving documents:', error);
                    });
                // const orderNew = new OrderModel({userId:userId,productId:new ObjectId(productId),quantity,price})
                // const rp = await OrderModel.create(orderNew);
                // return res.status(200).json({
                //     msg:"add order success",
                //     data: rp
                // })
            }
        }catch(error){
            res.status(501).json({
                msg:"error",
                err : error.message
            })
        }
    }
    async updateOrder(req,res,next){
        try{
            const id = req.query.id;
            console.log("idd",id)
            const data = req.body;
            const updateOrder = await OrderModel.findByIdAndUpdate(id,data,{
                new:true,
                runValidators:true
            }).exec()
            if(!updateOrder){
                return res.status(500).json({
                    msg: "no order for id order"
                })
            }
            console.log("check",updateOrder)
            updateOrder.updatedAt = Date.now();
            await updateOrder.save();
            res.status(200).json({
                msg:"update thành công",
                new:updateOrder
            })

        }catch(err){
            return res.status(500).json({
                msg: err.message,
            })
        }
    }
    async deleteOrderByid(req,res,next){
        try{
            const {idOrder} = req.query;
            console
            if(!idOrder){
                return res.status(500).json({
                    msg:"No id order"
                })
            }else{
                const order = await OrderModel.find({_id:idOrder}).exec();
                if(order==null){
                    return res.status(202).json({
                        msg:"no exists order"
                    })
                }
                console.log("da vao day",order)
                await OrderModel.findOneAndRemove({_id:idOrder},{
                    new:true,
                    runValidators:true
                }).exec();
                const orderDelete = await OrderModel.findOne({_id:idOrder}).exec();
                console.log("check 2",orderDelete)
                if(orderDelete==null){
                    res.status(200).json({
                        msg:"Delete orderDelete Sucessfully"
                    })
                }else{
                    res.status(401).json({
                        msg: "Delete order Unsucessfully"
                    })
                }
            }
        }catch(error){
            res.status(501).json({
                msg:"error",
                err : error.message
            })
        }
    }
}

export default OrderController