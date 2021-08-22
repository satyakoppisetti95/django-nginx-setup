
import AppNavbar from './components/AppNavbar';
import { AppFooter } from './components/AppFooter';

const Layout = ({children})=>{
    return(
        <div>
        <AppNavbar/>
            {children}
        <AppFooter/>
        </div>
    )
};

export default Layout;