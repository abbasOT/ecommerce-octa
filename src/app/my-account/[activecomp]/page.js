
import FooterBar from '@/components/LayoutComponents/Footer/FooterBar/FooterBar'
import FooterMain from '@/components/LayoutComponents/Footer/FooterMain/FooterMain'
import BreadCrumb from '@/components/LayoutComponents/Header/BreadCrumb/BreadCrumb'
import HeaderBar from '@/components/LayoutComponents/Header/HeaderBar/HeaderBar'
import HeaderMain from '@/components/LayoutComponents/Header/HeaderMain/HeaderMain'
import NavBar from '@/components/LayoutComponents/Header/Navbar/Navbar'
import MyAccountMain from '@/components/MyAccountComponents/MyAccountMain/MyAccountMain'

function MyAccountPage() {
    return (
        <>
            <HeaderBar />
            <HeaderMain />
            <NavBar />
            <BreadCrumb />
            <MyAccountMain />
            <FooterBar />
            <FooterMain />
        </>
    )
}

export default MyAccountPage
