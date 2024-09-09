
// import dynamic from 'next/dynamic';

import ContactPage from "@/components/ContactComponents/ContactPage/ContactPage";


// import LoadingSpinner from '@/components/Ui/LoadingSpinner/LoadingSpinner';


// Dynamically import HomePage with MUI loader
// const ContactPage = dynamic(() => import('@/components/ContactComponents/ContactPage/ContactPage'), {
//   loading: () => <LoadingSpinner />,
// });


export default function Home() {
    return (
        <>
      <ContactPage />
      {/* contact */}
        </>
    );
}
