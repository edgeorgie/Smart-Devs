import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avances/queries';
import React from 'react';
import { useParams } from 'react-router-dom';

const IndexCategory1 = () => {
  const { projectid }=useParams();

  const { data, loading }=useQuery(GET_AVANCES, {
    variables:{
      project: projectid,
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if(loading) return <div>Loading...</div>;

  return (
    <div>
      Index Category1 avances {projectid}

    </div>
  );
};

const Avance = ({avance}) => {
  return (
    <div>
      {avance.descripcion}
      {avance.fecha}
      {avance.observaciones}
    </div>
  );
};

export default IndexCategory1;
