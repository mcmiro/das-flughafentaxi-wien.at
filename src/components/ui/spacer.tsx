import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spacerVariants = cva('', {
  variants: {
    size: {
      xs: 'h-8',
      sm: 'h-16',
      lg: 'h-24',
      xl: 'h-32',
    },
  },
  defaultVariants: {
    size: 'xs',
  },
});

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {}

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {}
const Spacer = ({ className, size, ...props }: SpacerProps) => {
  return (
    <div className={cn(spacerVariants({ size, className }))} {...props}></div>
  );
};

export default Spacer;
