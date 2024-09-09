
import dynamic from 'next/dynamic';


import LoadingSpinner from '@/components/Ui/LoadingSpinner/LoadingSpinner';


const AboutUsPage = dynamic(() => import('@/components/AboutUsComponents/AboutUsPage/AboutUsPage'), {
  loading: () => <LoadingSpinner />,
});

export default function Home() {
  return (
    <>
      <AboutUsPage />
    </>
  );
}
