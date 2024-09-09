import dynamic from 'next/dynamic';


import LoadingSpinner from '@/components/Ui/LoadingSpinner/LoadingSpinner';


// Dynamically import HomePage with MUI loader
const HomePage = dynamic(() => import('@/components/HomeComponents/HomePage/HomePage'), {
  loading: () => <LoadingSpinner />,
  ssr:false
});

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
