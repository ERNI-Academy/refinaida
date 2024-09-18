const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto my-6 px-6 md:my-8 md:px-8">
      {children}
    </div>
  );
};

export default Container;
