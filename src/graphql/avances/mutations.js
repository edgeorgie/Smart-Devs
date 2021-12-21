import { gql } from '@apollo/client';

const EDITAR_AVANCE = gql`
  mutation EditarAvanceEstudiante($id: String!, $descripcion: String!) {
    editarAvanceEstudiante(_id: $id, descripcion: $descripcion) {
      _id
      descripcion
      fecha
      observaciones {
        descripcion
      }
    }
  }
`;

const CREAR_AVANCE = gql`
  mutation Mutation(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      _id
    }
  }
`;

const CREAR_OBSERVACION = gql`
  mutation Mutation($_id: String!, $observacion: String!) {
    crearObservacion(_id: $_id, observacion: $observacion) {
      _id
      observaciones
    }
  }
`;

const EDITAR_OBSERVACION = gql`
  mutation Mutation($_id: String!, $observacion: String!) {
    editarObservacion(_id: $_id, observacion: $observacion) {
      _id
      observaciones
    }
  }
`;

export { EDITAR_AVANCE, EDITAR_OBSERVACION, CREAR_AVANCE, CREAR_OBSERVACION };
