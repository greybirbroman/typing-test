const ButtonDifficultyBar = ({ handleStartTest }) => {
  return (
    <ul className='flex flex-wrap gap-3 items-center justify-center z-20'>
      <li>
        <button
          type='button'
          className='green_btn'
          onClick={() => handleStartTest('low')}
        >
          Low
        </button>
      </li>
      <li>
        <button
          type='button'
          className='yellow_btn'
          onClick={() => handleStartTest('medium')}
        >
          Medium
        </button>
      </li>
      <li>
        <button
          type='button'
          className='red_btn'
          onClick={() => handleStartTest('high')}
        >
          High
        </button>
      </li>
    </ul>
  );
};

export default ButtonDifficultyBar;
