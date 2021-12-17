import { useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avances/queries';
import React from 'react';
import { useParams } from 'react-router-dom';

const IndexCategory1 = () => {
  const { projectid }=useParams();

  const {data, loading, error}=useQuery(GET_AVANCES);

  if (loading) return <div>Loading...</div>;

 

  return (
    <div>
      Index Category1 avances {projectid}
    
      return 
        <div>este es un avance </div>;
      )
    </div>
  );
};

export default IndexCategory1;
