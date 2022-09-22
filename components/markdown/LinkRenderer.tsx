import { FC } from 'react';

const LinkRenderer: FC = (props: any) => {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
};

export default LinkRenderer;
