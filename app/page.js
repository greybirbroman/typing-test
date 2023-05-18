import Feed from '../components/Feed';

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Type Faster with <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>Typing Test</span>
        
      </h1>
      <p className='desc text-center'>
        Learn to type fast with the our Keyboard Trainer. And touch typing
        lessons will help you use all 10 fingers.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
