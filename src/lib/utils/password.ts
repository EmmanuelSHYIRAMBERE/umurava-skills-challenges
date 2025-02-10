import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const saltRounds = await bcrypt.genSalt(
    parseInt(process.env.saltRounds as string)
  );
  const hashedPwd = await bcrypt.hash(password, saltRounds);

  return hashedPwd;
};

export const comparePassword = async (password: string, hashedPwd: string) => {
  const isPwdMatch = await bcrypt.compare(password, hashedPwd);

  return isPwdMatch;
};
