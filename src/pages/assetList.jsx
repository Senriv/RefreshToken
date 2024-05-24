import { useGetAssetsQuery } from '../redux/asset/assetApiSlice';
import { Link } from 'react-router-dom';

const AssetsList = () => {
  const {
    data: assets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAssetsQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Assets List</h1>
        <ul>
          {assets.map((asset) => {
            return <li key={asset.id}>{asset.name}</li>;
          })}
        </ul>
        <Link to="/welcome">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
export default AssetsList;
