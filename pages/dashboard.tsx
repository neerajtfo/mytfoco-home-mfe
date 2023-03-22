import dynamic from 'next/dynamic';
import { getCookie } from '@/utils/cookies';
import cookieCutter from 'cookie-cutter';

const ClientsApp = dynamic(() => import('app1/pages/index'), {
  ssr: false
}) as any;

const ClientsWrapper = dynamic(() => import('app1/pages/wrapper'), {
  ssr: false
}) as any;

const ProspectsWrapper = dynamic(() => import('app2/pages/wrapper'), {
  ssr: false
}) as any;

const ProspectsApp = dynamic(() => import('app2/pages/index'), {
  ssr: false
}) as any;

interface IProps {
  role: string;
}

function Dashboard({ role }: IProps) {
  const RemoteApp = role === 'clients' ? ClientsApp : ProspectsApp;
  const Wrapper = role === 'clients' ? ClientsWrapper : ProspectsWrapper;

  return (
    <div>
      <Wrapper>
        <RemoteApp role={role} />
      </Wrapper>
    </div>
  );
}

Dashboard.getInitialProps = async ({ req }: any) => {
  const isServer = !!req;
  let role;

  if (isServer) {
    role = getCookie('token', req?.headers?.cookie);
  } else {
    role = cookieCutter.get('token');
  }
  return { role };
};

export default Dashboard;
