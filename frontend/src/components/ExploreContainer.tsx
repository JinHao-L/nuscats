import { useState } from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {

  const [num, setNum] = useState<number>(0)

  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      <button className="m-5 px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg" onClick={() => setNum(num+1)}>Click me</button>
      <div>
        <span className="text-lg text-gray-800 font-normal">Num: {num}</span>
      </div>
    </div>
  );
};

export default ExploreContainer;
