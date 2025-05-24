function RedText({ children }) {   
  return (
    <div className="inline-block rounded-full bg-red-200 px-3 py-1 text-sm text-red-800 font-medium">
        {children}
    </div>

  );
}

export default RedText;
