
import * as zod from "zod";

export const Registerschema = zod.object({
  name: zod
    .string()
    .nonempty("name is required")
    .min(3, "min length is 3 chars")
    .max(10, "max length is 10 chars"),

  email: zod
    .email()
    .nonempty("email is required")
    .regex(
       /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ ,
      "invalid email"
    ),

  dateOfBirth: zod
    .string()
    .nonempty("date is required")
    .refine((dateOfBirthvalue) => {
      const userDate = new Date(dateOfBirthvalue).getFullYear();
      const nowDate = new Date().getFullYear();

      return nowDate - userDate > 10;
    }, "date should be less than ==> 2015"),

  gender: zod.enum(["male", "female"]),

  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
      "The password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character."
    ),

  rePassword: zod.string().nonempty("repassword is required"),
}).refine(
  (obj) => {
    if (obj.password === obj.rePassword) {
      return true;
    } else {
      return false;
    }
  },
  {
    path: ["rePassword"],
    message: "password and repassword not match",
  }
);

export type RegisterschemaType = zod.infer<typeof Registerschema>;
 


//////////////////////////////////////////////////////////////////


 

export const LoginSchema = zod.object({
  
  email: zod
    .email()
    .nonempty("email is required")
    .regex(
     /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/  ,
      "invalid email"
    ),


  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
      "The password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character."
    ),

})
  
export type LoginSchemaType = zod.infer<typeof LoginSchema>;
 
 

