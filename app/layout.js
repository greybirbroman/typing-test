import '../styles/globals.css';

import Nav from '../components/Nav';

export const metadata = {
  title: 'Typing-Test',
  description: 'Learn to type fast with the typing trainer',
};

const RootLayout = ({ children }) => {

  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>
          <header className='flex justify-between w-full'>
            <Nav/>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout

