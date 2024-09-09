
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/Ui/LoadingSpinner/LoadingSpinner';


const LogIn = dynamic(() => import('@/components/RegistrationComponents/LogIn/LogIn'), {
    loading: () => <LoadingSpinner />,
    ssr:false
  });


export default function LogInPage() {
    return (
        <div style={{ background: "#F8FAFC" }}>
            <LogIn />
        </div>
    );
}
