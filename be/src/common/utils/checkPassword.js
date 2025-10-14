import { BadrequestException } from "../helpers/exception.helper.js";

export const checkPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  if (!regex.test(password)) {
    throw new BadrequestException(
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ in hoa và 1 ký tự đặc biệt."
    );
  }
};
