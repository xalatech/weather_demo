import { FC } from 'react';

interface AlertProps {
  message: string;
}

const Alert: FC<AlertProps> = ({ message }) => {
  return(
      <p className="alert__container alert alert-danger">{message}</p>
  );
}

export default Alert;