import { Outlet } from 'react-router-dom';
import styles from './index.module.css';
import { Flex } from '../../../components/common/Flex';

export const PageLayout = () => {
  return (
    <Flex direction="column" gap="1rem" className={styles.appContainer}>
      <Outlet />
    </Flex>
  );
};
