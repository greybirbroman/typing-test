import '../styles/globals.css';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Typing-Test',
  description: 'Learn to type fast with the typing trainer',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen'>
        <Nav />
        <main className='flex-1 app w-full'>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
