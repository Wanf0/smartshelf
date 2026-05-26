import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const emptyVariants = cva('flex flex-col items-center justify-center gap-2', {
  variants: {
    variant: {
      default: '',
      compact: 'py-8',
      spacious: 'py-16',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof emptyVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(emptyVariants({ variant }), className)}
      {...props}
    />
  )
})
Empty.displayName = 'Empty'

const EmptyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col items-center gap-1', className)}
      {...props}
    />
  )
})
EmptyHeader.displayName = 'EmptyHeader'

const EmptyTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
})
EmptyTitle.displayName = 'EmptyTitle'

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})
EmptyDescription.displayName = 'EmptyDescription'

const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center text-muted-foreground *:size-10',
        className,
      )}
      {...props}
    />
  )
})
EmptyMedia.displayName = 'EmptyMedia'

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia }
