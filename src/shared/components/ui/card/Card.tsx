import { HTMLAttributes, ReactNode } from "react"
import { cn } from "../../../utils/cn"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white shadow-md", // tarjeta clara por defecto
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
