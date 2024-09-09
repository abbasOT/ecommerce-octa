

import dynamic from 'next/dynamic';

import LoadingSpinner from '@/components/Ui/LoadingSpinner/LoadingSpinner';


const SignUp = dynamic(() => import('@/components/RegistrationComponents/SignUp/SignUp'), {
    loading: () => <LoadingSpinner />,
    ssr:false
  });


export default function SignUpPage() {
    return (
        <div style={{ background: "#F8FAFC" }}>
            <SignUp />
        </div>
    );
}
