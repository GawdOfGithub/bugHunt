import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getJoinedDate = (date: Date | undefined): string => {
  if (!date) {
    // Return some arbitrary date, e.g., January 1, 2000
    const arbitraryDate = new Date(2000, 0, 1);
    return arbitraryDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  const formattedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return formattedDate;
};

export const formatANndDivideNumber = (num:number):string =>
{
  if(num>=1000)
  {
    const formattedNumber = (num/1000).toFixed(1)
    return `${formattedNumber}K`
  }
  else{
    return num.toString()
  }
}