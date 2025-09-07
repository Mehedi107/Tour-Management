import { envVars } from "../config/env";
import { IAuthMethod, IUser, UserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";

export const createSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL });

    if(isSuperAdminExist) return;
    

    const authProvider: IAuthMethod = { 
      provider: 'credentials', 
      providerId: envVars.SUPER_ADMIN_EMAIL, 
    }

    const hashedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, +envVars.BCRYPT_SALT);

    const payload: IUser = {
      name: "Super Admin",
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
      role: UserRole.SuperAdmin,
      auth: [authProvider], 
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const superAdmin = await User.create(payload);

  } catch (error) {
    console.log(error);
  }
}