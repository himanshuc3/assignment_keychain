import { Layout, Typography } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';

const { Header, Content } = Layout;

function Home() {
  return <Typography.Title level={3}>Templates</Typography.Title>;
}

export function App() {
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Header style={{ borderBottom: '1px solid #eceef5', display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ fontWeight: 600, fontSize: 18 }}>
          Form Builder
        </Link>
      </Header>
      <Content style={{ padding: 24 }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Content>
    </Layout>
  );
}
