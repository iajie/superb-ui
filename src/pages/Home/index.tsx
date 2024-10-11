import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';

const HomePage: React.FC = () => {
  return (
    <PageContainer title='首页' style={{ height: '91vh' }} ghost>
      <div className={styles.container}>
      </div>
    </PageContainer>
  );
};

export default HomePage;
