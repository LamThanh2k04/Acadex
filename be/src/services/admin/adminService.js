import { ConflictException, NotFoundException } from "../../common/helpers/exception.helper.js";
import prisma from "../../common/prisma/initPrisma.js";
import { checkEmail } from "../../common/utils/checkEmail.js";
import { checkPassword } from "../../common/utils/checkPassword.js";
import bcrypt from "bcrypt"
export const adminService = {
    createFaculty: async (data) => {
        const { name } = data;

        const existingFaculty = await prisma.faculty.findFirst({ where: { name } })
        if (existingFaculty) {
            throw new ConflictException("Đã tồn tại khoa này. Vui lòng nhập tên khác")
        }
        const newFaculty = await prisma.faculty.create({
            data: {
                name: name
            }
        })
        return {
            newFaculty
        }
    },
    createMajor: async (data) => {
        const { facultyId, name } = data

        const existingFaculty = await prisma.faculty.findUnique({
            where: { id: parseInt(facultyId) }
        })
        if (!existingFaculty) {
            throw new NotFoundException("Không tìm thấy khoa này. Vui lòng kiểm tra lại")
        }
        const newMajor = await prisma.major.create({
            data: {
                facultyId: parseInt(facultyId),
                name: name
            }
        })
        return {
            newMajor
        }
    },
    createClass: async (data) => {
        const { majorId, name } = data

        const existingMajor = await prisma.major.findUnique({
            where: { id: parseInt(majorId) }
        })
        if (!existingMajor) {
            throw new NotFoundException("Không tìm thấy ngành này. Vui lòng kiểm tra lại")
        }

        const newClass = await prisma.class.create({
            data: {
                majorId: parseInt(majorId),
                name: name
            }
        })
        return {
            newClass
        }
    },

    createStudent: async (data, imageFile) => {
        const { fullName, email, password, classId, facultyId, majorId, trainingLevel, status, statusUpdatedAt } = data

        const missingField = []
        if (!fullName) missingField.push("fullName")
        if (!email) missingField.push("email")
        if (!password) missingField.push("password")
        if (missingField.length > 0) {
            throw new BadrequestException(`Thiếu trường: ${missingField.join(",")} để tạo sinh viên`)
        }
        checkEmail(email, "student")
        checkPassword(password)
        const existingEmail = await prisma.user.findUnique({ where: { email } })
        if (existingEmail) {
            throw new ConflictException("Email đã tồn tại. Vui lòng chọn email khác.");
        }
        const hashpassword = await bcrypt.hash(password, 10)

        const newStudent = await prisma.user.create({
            data: {
                fullName: fullName,
                email: email,
                password: hashpassword,
                avatar: imageFile || "",
                role: "student",
                student: {
                    create: {
                        classId: parseInt(classId),
                        facultyId: parseInt(facultyId),
                        majorId: parseInt(majorId),
                        trainingLevel: trainingLevel,
                        status: status,
                        statusUpdatedAt: statusUpdatedAt ? new Date(new Date(statusUpdatedAt)) : new Date()
                    }
                }
            },
            include: {
                student: true,
            },
        })
        return {
            newStudent
        }

    }
}