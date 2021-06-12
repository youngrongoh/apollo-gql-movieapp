import { gql, useMutation } from '@apollo/react-hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  height: 360px;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const Movie = ({ id, bg, isLiked }) => {
  const [toggleLikeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked },
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button onClick={toggleLikeMovie}>{isLiked ? 'Unlike' : 'Like'}</button>
    </Container>
  );
};

export default Movie;
