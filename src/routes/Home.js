import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Movie from '../components/Movie';

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

const Container = styled.div`
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Header = styled.div`
  height: 420px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  color: white;
`;

const Title = styled.h1`
  font-size: 68px;
  margin-bottom: 30px;
`;

const Subtitle = styled.h3`
  font-size: 35px;
  font-weight: 300;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
  margin: 0 auto;
`;

const Home = () => {
  const { loading, data } = useQuery(GET_MOVIES);
  return (
    <Container>
      <Header>
        <Title>Apollo 2020</Title>
        <Subtitle>I love GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <Movies>
        {data?.movies?.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            isLiked={movie.isLiked}
            bg={movie.medium_cover_image}
          />
        ))}
      </Movies>
    </Container>
  );
};

export default Home;
