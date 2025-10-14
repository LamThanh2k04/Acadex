import { responseSuccess } from "../../common/helpers/response.helper.js";
import { authService } from "../../services/auth/authServices.js"

export const authController = {
    registerAdmin: async (req, res, next) => {
        try {
            const data = await authService.registerAdmin(req.body);
            const reponse = responseSuccess(data, "Tạo tài khoản admin thành công")
            res.status(reponse.status).json(reponse)
        } catch (err) {
            console.error("Đăng kí tài khoản admin không thành công", err)
            next(err)
        }
    },
    
    login : async (req,res,next) => {
        try {
             const data = await authService.login(req.body);
            const reponse = responseSuccess(data, "Tạo tài khoản thành công")
            res.status(reponse.status).json(reponse)
        } catch (err) {
            console.error("Đăng nhập tài khoản  không thành công", err)
            next(err)
        }
    }
}