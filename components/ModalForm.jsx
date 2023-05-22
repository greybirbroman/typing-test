'use client';

const ModalForm = ({ title, subtext, children }) => {
  return (
    <form className='flex flex-col'>
      <h3 className='head_text'>{title}</h3>
      <p className='orange_gradient mb-5'>{subtext}</p>
      {children && (
        <>
          {children}
          <label className='text-[14px] mb-2'>E-mail</label>
          <input
            className='mb-2 w-full border border-gray-600 text-gray-900 text-sm rounded-md focus:ring-[#4649ff] focus:border-[#4649ff] focus:border outline-none p-3'
            type='email'
            required
            placeholder='Enter email here...'
          />
          <label className='text-[14px] mb-2'>Password</label>
          <input
            className='mb-2 w-full border border-gray-600 text-gray-900 text-sm rounded-md focus:ring-[#4649ff] focus:border-[#4649ff] focus:border outline-none p-3'
            type='password'
            required
            placeholder='Your password'
          />
          <div className='flex justify-between mt-5'>
            <button type='button' className='text-gray-500 text-sm'>
              Cancel
            </button>
            <button
              type='submit'
              className='orange_btn'
            >
              Enter
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default ModalForm;
