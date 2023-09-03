const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] bg-slate-200 flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
