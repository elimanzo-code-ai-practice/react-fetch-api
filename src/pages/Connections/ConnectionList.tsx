/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import ListPage from 'components/Common/ListPage';
import React, { useState } from 'react';
import { allItems } from 'utils/NavTree';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import VideoGame, { VideoGameProps } from 'components/VideoGame/VideoGame';


const fetchGames = async (searchInput = '', page = 1) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/games`, {
    method: 'POST',
    body: JSON.stringify({ searchInput, page }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};


export default function ConnectionList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const { data, isLoading, error } = useQuery({
    queryKey: ['games', debouncedSearchQuery, currentPage],
    queryFn: () => fetchGames(debouncedSearchQuery, currentPage),
  });

  const debouncedSetSearchQuery = debounce((value: string) => {
    setDebouncedSearchQuery(value);
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    debouncedSetSearchQuery(value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <ListPage
      headerItem={allItems.connectionsList}
      list={data ?? []}
      isLoading={isLoading}
      error={error}
      currentPage={currentPage}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
      renderItem={(item: VideoGameProps) => (<VideoGame {...item} />)}
    />
  );
}
