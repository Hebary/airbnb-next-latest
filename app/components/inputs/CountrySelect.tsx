'use client';

import { useCountries } from '@/app/hooks';
import { FC } from 'react'
import Select, { Theme } from 'react-select'

export type CountrySelectValue = {
  flag : string;
  label: string;
  latlng: number[];
  region: string;
  value: string
}

interface Props {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
const CountrySelect:FC<Props> = ({ value, onChange }) => {
  
  const { getAll } = useCountries();
  
  return (
    <div>
      <Select
        placeholder='Anywhere'
        isClearable
        options={ getAll() }
        value = { value }
        onChange = { (value: CountrySelectValue) => onChange(value)}
        formatOptionLabel = {( option: any) => (
          <div className='flex flex-row items-center gap-3'>
            <div>
              { option.flag }
            </div>
            <div>
              { option.label }
              <span className='text-neutral-500 ml-2'>
                { option.region }
              </span>
            </div>
          </div>
        )}
        classNames={{
          control : () => 'p-3 border-2',
          input   : () => 'text-lg',
          option  : () => 'text-lg',
        }}
        theme={(theme: Theme) => ({
          ...theme,
          borderRadius: 7,
          colors: {
            ...theme.colors,
            primary: '#000',
            primary25: '#FFE4E6',
          }
          })
        }
      />  
    </div>
  )
}

export default CountrySelect