import { responseSuccess } from "../../common/helpers/response.helper.js"
import { adminService } from "../../services/admin/adminService.js"

export const adminController = {
    createFaculty: async (req, res, next) => {
        try {
            const data = await adminService.createFaculty(req.body)
            const reponse = responseSuccess(data, "Tạo khoa thành công")
            res.status(reponse.status).json(reponse)
        } catch (err) {
            console.error("Tạo khoa không thành công", err)
            next(err)
        }
    },
    createMajor: async (req, res, next) => {
        try {
            const data = await adminService.createMajor(req.body)
            const reponse = responseSuccess(data, "Tạo ngành thành công")
            res.status(reponse.status).json(reponse)
        } catch (err) {
            console.error("Tạo ngành không thành công", err)
            next(err)
        }
    },
    createClass: async (req, res, next) => {
        try {
            const data = await adminService.createClass(req.body)
            const reponse = responseSuccess(data, "Tạo lớp thành công thành công")
            res.status(reponse.status).json(reponse)
        } catch (err) {
            console.error("Tạo lớp không thành công", err)
            next(err)
        }
    },
    createStudent: async (req, res, next) => {
        try {
            const imageFile = req.file?.path;
            const data = await adminService.createStudent(req.body, imageFile)
            const reponse = responseSuccess(data, "Tạo sinh viên thành công")
            res.status(reponse.status).json(reponse)
        } catch (err) {
            console.error("Tạo sinh không thành công", err)
            next(err)
        }
    }
}