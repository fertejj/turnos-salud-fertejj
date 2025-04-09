import { HTMLAttributes, ReactNode } from "react"
import { cn } from "../../shared/utils/cn"

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const CardContent = ({ children, className, ...props }: CardContentProps) => {
  return (
    <div
      className={cn("px-6 py-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default CardContent
