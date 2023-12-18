import React from 'react';
import { Button } from '../../ui/button';

type Props = {
  FilterData: Array<{ name: string }>;
};

function Filter({ FilterData }: Props) {
  return (
    <>
      <div className="flex gap-5 mt-12 max-sm:hidden">
        {FilterData.map((item, index) => (
          <Button key={index} className='px-3 py-3'>
            {item.name}
          </Button>
        ))}
      </div>
    </>
  );
}

export default Filter;
