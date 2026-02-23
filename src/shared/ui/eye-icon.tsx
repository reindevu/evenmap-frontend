import { FC } from "react";

type Props = {
  className?: string;
};

export const EyeIcon: FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 5c5.23 0 9.27 3.11 10.75 6.5C21.27 14.89 17.23 18 12 18S2.73 14.89 1.25 11.5C2.73 8.11 6.77 5 12 5Zm0 2C8.4 7 5.48 9 4.2 11.5 5.48 14 8.4 16 12 16s6.52-2 7.8-4.5C18.52 9 15.6 7 12 7Zm0 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
    </svg>
  );
};
