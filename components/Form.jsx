import Link from 'next/link';

const Form = ({ typingSpeed, typingAccuracy, handleSubmit, onRetry }) => {
  return (
    <section className='w-full max-w-full flex-center flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>Pass the typing test</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Find out your typing speed and surprise your friends or guide received
        certificate.
      </p>
      <button type='button' className='bg-primary-orange px-5 py-1.5 rounded-full text-white hover:bg-orange-500'>Start Test</button>
      <form className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism' onSubmit={handleSubmit}>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Typing Score: {typingSpeed} {typingAccuracy}
          </span>
          <textarea className='form_textarea' />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
        <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
        <button
          type='button'
          className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white hover:bg-orange-500'
          onClick={onRetry}
        >
          Retry
        </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
