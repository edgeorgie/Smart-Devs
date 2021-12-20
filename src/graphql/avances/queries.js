import { gql } from '@apollo/client';

const GET_AVANCES = gql`
  query Query($project: String) {
    Avances(project: $project) {
      _id
      fecha
      descripcion
      observaciones {
        _id
        descripcion
      }
    }
  }
`;

export { GET_AVANCES };