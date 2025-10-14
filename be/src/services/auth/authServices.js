import { BadrequestException, ConflictException } from "../../common/helpers/exception.helper.js"
import prisma from "../../common/prisma/initPrisma.js"
import { checkEmail } from "../../common/utils/checkEmail.js"
import bcrypt from "bcrypt"
import { generateToken } from "../../common/utils/generateToken.js"
import { checkPassword } from "../../common/utils/checkPassword.js"

export const authService = {
    registerAdmin: async (data) => {
        const { fullName, email, password } = data
        checkEmail(email, "admin")
        checkPassword(password)
        let missingField = []
        if (!fullName) missingField.push("fullName")
        if (!email) missingField.push("email")
        if (!password) missingField.push("password")
        if (missingField.length > 0) {
            throw new BadrequestException(`Thiếu trường: ${missingField.join(",")} để đăng kí`)
        }
        const existingEmail = await prisma.user.findUnique({ where: { email } })
        if (existingEmail) {
            throw new ConflictException("Email đã tồn tại. Vui lòng đăng nhập")
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                fullName: fullName,
                email: email,
                password: hashpassword
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                password: true,
                gender: true,
                avatar: true,
                address: true,
                role: true,
                phone: true,
                dateOfBirth: true,
                isActive: true,
            }
        })
        return {
            newUser
        }

    },

    login: async (data) => {
        const { email, password } = data
        const user = await prisma.user.findUnique({ where: { email } })
        let missingField = []
        if (!email) missingField.push("email")
        if (!password) missingField.push("password")
        if (missingField.length > 0) {
            throw new BadrequestException(`Thiếu trường: ${missingField.join(",")} để đăng nhập`)
        }
        checkEmail(email, user.role)
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new BadrequestException("Mật khẩu không đúng. Vui lòng nhập lại")
        }
        const token = generateToken(user.id, user.role, user)
        return {
            token
        }
    }
}