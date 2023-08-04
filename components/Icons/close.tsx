export const Close = ({ active }: { active: boolean }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.25 1.25L8 8M8 8L1.25 14.75M8 8L14.75 14.75M8 8L14.75 1.25"
        stroke={active ? 'white' : '#999CA0'}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
