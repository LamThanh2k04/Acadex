export const checkEmail = (email, role) => {
  console.log("Email đang kiểm tra:", email, "Role:", role);

  // Kiểm tra định dạng email cơ bản
  const baseRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!baseRegex.test(email)) {
    const error = new Error("Email không hợp lệ.");
    error.status = 400;
    throw error;
  }

  // Kiểm tra domain theo role
  switch (role) {
    case "admin":
      if (!email.endsWith("@gmail.com")) {
        const error = new Error(
          "Admin phải sử dụng email kết thúc bằng @gmail.com"
        );
        error.status = 400;
        throw error;
      }
      break;

    case "student":
      if (!email.endsWith("@edu.acadex")) {
        const error = new Error(
          "Sinh viên phải sử dụng email kết thúc bằng @edu.acdex"
        );
        error.status = 400;
        throw error;
      }
      break;

    case "lecturer":
      if (!email.endsWith("@edu.acadex")) {
        const error = new Error(
          "Giảng viên phải sử dụng email kết thúc bằng @edu.acdex"
        );
        error.status = 400;
        throw error;
      }
      break;

    default:
      const error = new Error("Role không hợp lệ khi kiểm tra email.");
      error.status = 400;
      throw error;
  }
};
