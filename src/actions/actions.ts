'use server'

import prisma from "@/lib/db"
import { UserSchema } from "@/validations/validations"
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types"
import { error } from "console"

export async function getUserData(id: KindeUser<string>["id"]) {

  const validatedId = UserSchema.pick({id: true}).safeParse({ id})
  if(!validatedId.success){
    return {
      succes: false,
      error: validatedId.error
    }
  }
  try {
    const response = await prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        email: true,
        colorScheme: true,
      }
    })
    return {
      success: true,
      data: response
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
}

export async function postData(formData: FormData, id: KindeUser<string>["id"]) {
  
  const validatedData = UserSchema.pick({id: true, name: true, colorScheme: true}).safeParse(formData);
  console.log(validatedData.success, validatedData.error)
  if(!validatedData.success) {
    return {
      success: false,
      error: validatedData.error
    }
  }
  // try {
  //   await prisma.user.update({
  //     where: {
  //       id: id
  //     },
//     data: {
  //       name: "",
  //       colorScheme: "",        
  //     }
  //   })
  // } catch (error) {
    
// }
}