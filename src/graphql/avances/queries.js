import { gql } from '@apollo/client';

const GET_AVANCES = gql`
    query Avances($project: String) {
        Avances(project: $project) {
            _id
            fecha
            descripcion
            observaciones
            proyecto {
                nombre
            }
        }
    }
`;

export { GET_AVANCES };