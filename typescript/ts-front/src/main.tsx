import { JSX } from 'react';
import ReactDOM from 'react-dom/client';

interface WelcomeProps {
  name: string;
  age: number;
}

const Welcome = (props: WelcomeProps): JSX.Element => {
  return (
    <h1>
      Hello, {props.name}, you're {props.age} today!{' '}
    </h1>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Welcome name="Sarah" age={34} />
);
