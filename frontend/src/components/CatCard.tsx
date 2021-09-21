import { Cat } from '@api/cats';
import { Link } from 'react-router-dom';
import { CAT_ROUTE } from 'app/routes';
import BaseCatCard from './BaseCatCard';

interface CatCardProps {
    cat: Cat;
}

const CatCard: React.FC<CatCardProps> = ({ cat }) => {
    return (
        <Link to={`${CAT_ROUTE}/${cat.id}`}>
            <BaseCatCard cat={cat} />
        </Link>
    );
};

export default CatCard;
