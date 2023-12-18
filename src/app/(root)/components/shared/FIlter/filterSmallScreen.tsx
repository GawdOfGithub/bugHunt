import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../ui/select"
  import React from 'react'

  

  type Props = {
    FilterData: Array<{ name: string }>;
  };
  const FilterSmallScreen = ({FilterData}: Props) => {
    return (
        <div className="sm:hidden w-screen ">
        <Select>
        <SelectTrigger className="w-screen bg-gray-100 text-black">
          <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent>
          {
            FilterData.map((item,index)=>
            (
                <SelectItem key={index} value={item.name}>{item.name}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>
      </div>
    )
  }
 export default FilterSmallScreen