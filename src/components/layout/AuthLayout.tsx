type Props = {
    children: React.ReactNode;
  };
  
  export default function AuthLayout({ children }: Props) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    );
  }
  