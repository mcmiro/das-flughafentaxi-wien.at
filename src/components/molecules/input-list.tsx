import { StreetModel } from '@/types/street';
import { Check } from 'lucide-react';

export type InputListProps<T extends StreetModel> = {
  items: T[];
  selectedItem: T;
  onSelect: (e?: any) => void;
};

const InputList = <T extends StreetModel>({
  items,
  selectedItem,
  onSelect,
}: InputListProps<T>) => {
  return (
    <div className="absolute max-h-64 overflow-y-auto top-0 left-0 z-50 w-full text-sm border bg-background p-1 shadow-md duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-md">
      <ul>
        {items.map((street, index) => (
          <li
            key={index}
            className="flex items-center justify-center hover:bg-accent rounded-sm px-2"
          >
            {selectedItem?.name === street.name && (
              <Check className="h-4 w-4" />
            )}
            <span
              onClick={() => onSelect(street)}
              className={`relative flex w-full cursor-default select-none items-center py-1.5 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
                selectedItem?.name === street.name ? 'pl-2' : 'pl-6'
              }`}
            >
              {street.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputList;
