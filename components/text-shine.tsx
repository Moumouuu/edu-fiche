const TextShine = ({children}: {
    children: React.ReactNode;
}
) => {
    return (
      <h1 className='bg-gradient-to-t text-black dark:from-[#8c8b8b] font-semibold dark:to-[#fff] bg-clip-text text-2xl md:text-5xl text-center w-[90%] dark:text-transparent my-8'>
        {children}
      </h1>
    );
  };
  
  export default TextShine;
  