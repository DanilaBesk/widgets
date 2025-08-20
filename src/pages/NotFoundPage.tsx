import { useNavigate } from 'react-router-dom';
import Button from '../components/common/button/button';
import Title from '../components/common/title/title';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate('/');
  };
  return (
    <header className="app-header-margin-top">
      <Title level={1}>Страница не найдена</Title>
      <Button onClick={onButtonClick}>Вернуться на главную страницу</Button>
    </header>
  );
};

export default NotFoundPage;
