import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-noir disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'glass-button text-pearl px-6 py-3',
        secondary:
          'bg-ocean/20 border border-ocean/40 text-pearl hover:bg-ocean/30 hover:border-ocean px-6 py-3',
        outline:
          'border border-ocean/30 text-pearl hover:bg-ocean/10 hover:border-ocean/50 px-6 py-3',
        ghost:
          'text-pearl/70 hover:text-pearl hover:bg-ocean/10 px-6 py-3',
        link:
          'text-ocean underline-offset-4 hover:underline px-0 py-0',
      },
      size: {
        default: 'h-11 px-6 py-3',
        sm: 'h-9 px-4 py-2 text-xs',
        lg: 'h-13 px-8 py-4 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
