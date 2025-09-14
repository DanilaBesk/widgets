import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Title from '../../components/common/Title';
import { Flex } from '../../components/common/Flex';
import styles from './index.module.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate('/');
  };
  return (
    <Flex as="header" direction="column" items="center" justify="center" className={styles.header}>
      <Title level={1}>Страница не найдена</Title>
      <Button onClick={onButtonClick}>Вернуться на главную страницу</Button>
    </Flex>
  );
};
