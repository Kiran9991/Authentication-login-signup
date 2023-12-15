import MainNavigation from './MainNavigation';
import AuthProvider from '../Context/AuthProvider';

const Layout = (props) => {
  return (
    <AuthProvider>
      <MainNavigation />
      <main>{props.children}</main>
    </AuthProvider>
  );
};

export default Layout;
