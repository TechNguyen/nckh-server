import multer from "multer";
import ProductModel from "../../model/Product.model.js"
import Common from "../../../Helper/Common.js";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var commonjs = new Common();
 
class ProductController {
    async GetProductbyPage(req,res,next) {
        try {
            const {pageSize,pageIndex} = req.query
            if(req.body == null) {
                var list = await ProductModel.find({deleted: false}).exec();
                return res.status(200).json(list)
            }
            if(pageIndex != null && pageSize != null) {
                var list = await ProductModel.find({deleted: false}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec();
                return res.status(200).json(list)
            }
            var list = await ProductModel.find({deleted: false}).exec();
            return res.status(200).json(list)
        } catch (error) {
            return res.json(500).status({
                msg: error.message
            })
        }
    }
    async CreatePro(req,res,next) {
        try {
            const ProductMD = new ProductModel(req.body);
            const rs = await ProductModel.create(ProductMD);
            return res.status(ts)
        } catch (error) {
            return res.json(500).status({
                msg: error.message
            })
        }
    }
    async Update(req,res,next) {
        try {
            const id = req.query.id;
            const data = req.body
            const updatePro = await ProductModel.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            }).exec();
            updatePro.updated = true;
            updatePro.updateAt = Date.now();
            await updatePro.save();
            return res.status(203).json(updatePro)
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async DeleteSoft(req,res,next) {
        try {
            const id = req.query.id;
            const updatePro = await ProductModel.findByIdAndUpdate(id, {
                new: true,
                runValidators: true,
            }).exec();
            updatePro.updateAt = Date.now();
            updatePro.deleteAt = Date.now();
            updatePro.deleted = true;
            await updatePro.save();
            return res.status(204).json(updatePro)
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async Delete(req,res,next) {
        try {
            const id = req.query.id;
            const pro =  await  ProductModel.findById(id).exec();
            if(pro == null) {
                return res.status(202).json({
                    msg: "Not exists product"
                })
            }
            await ProductModel.findByIdAndRemove(id, {
                new: true,
                runValidators: true,
            }).exec();
            const proDelete = await ProductModel.findById(id).exec();
            return proDelete == null ? res.status(202).json({
                msg: "Delete product successfully!",
            }) : res.status(401).json({
                msg: "Delete product unsuccessfully!",
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
    async ImportProduct(req,res,next,filePath) {
        try {
            console.log(filePath);
            const dataJson = commonjs.importExceltoMongo(filePath, "Sheet1");
            await ProductModel.insertMany(dataJson)
            return res.status(200).json({
                status: 200,
                msg: "Import excel successfully!"
            })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    }
}


export default ProductController