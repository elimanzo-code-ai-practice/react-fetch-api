import { useQuery } from '@tanstack/react-query';
import ListPage from 'components/Common/ListPage';
import { allItems } from 'utils/NavTree';


const fetchGames = async () => {
  const clientId = process.env.REACT_APP_IGDB_CLIENT_ID;
  const accessToken = process.env.REACT_APP_IGDB_ACCESS_TOKEN;

  if (!clientId || !accessToken) {
    throw new Error('Missing Client ID or Access Token');
  }

  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/games`, {
    method: 'POST',
    body: 'fields name, summary, cover.url; limit 10;',
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};


export default function ConnectionList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
  });

  if (error) {
    return (
      <div>
        Error:
        <br />
        {error.message}
      </div>
    );
  }

  return <ListPage headerItem={allItems.connectionsList} list={data ?? []} isLoading={isLoading} />;
}
