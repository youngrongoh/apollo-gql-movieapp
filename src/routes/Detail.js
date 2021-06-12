import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.23);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 45px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-image: url(${(props) => props.bg});
  background-color: transparent;
  background-repeat: no-repeat;
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, { variables: { id: Number(id) } });
  console.log(data);
  return (
    <Container>
      <Column>
        <Title>
          {loading ? 'Loading...' : `${data.movie.title} ${data.movie.isLiked ? '💖' : '😞'}`}
        </Title>
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image} />
    </Container>
  );
};

export default Detail;
