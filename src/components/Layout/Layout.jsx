// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="h-screen overflow-x-hidden">
      <main className="mx-auto h-full">{children}</main>
    </div>
  );
};

export default Layout;
