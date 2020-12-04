import React, { FC } from 'react';

interface AlertProps {
  message: string;
}

const Alert: FC<AlertProps> = ({ message }) => {
  return(
    <div className="alert__container card">
      <div className="card-body">
          <p className="alert alert-danger">{message}</p>
      </div>
    </div>
  );
}

export default Alert;