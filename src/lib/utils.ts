import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getJoinedDate = (date:Date):string =>
{
  const month = date.toLocaleString('default',{month:'long'})
  const year = date.getFullYear()
  const joinedDate = `${month} ${year}`
  return joinedDate
}