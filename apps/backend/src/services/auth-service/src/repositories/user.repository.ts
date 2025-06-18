import User, { User as UserDoc } from "../models/User.model";

export const createUser = async(userData:UserDoc)=>User.create(userData);
export const findUserByEmail = async(email:string,shouldHavePassword=false)=>{
    if(shouldHavePassword) return await User.findOne({email}).select("+password")
    return await User.findOne({email})

}
export const findUserById = (id: string) => User.findById(id);  

export const findUserByName = (name: string) => {
  return User.find({
    name: { $regex: name, $options: 'i' } // 'i' for case-insensitive
  });
};
