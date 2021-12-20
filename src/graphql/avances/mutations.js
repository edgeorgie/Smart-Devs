import { gql } from '@apollo/client';

const EDITAR_AVANCE = gql`
  mutation EditarAvanceEstudiante($id: String!, $descripcion: String!) {
    editarAvanceEstudiante(_id: $id, descripcion: $descripcion) {
      _id
      descripcion
      fecha
      observaciones {
        _id
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

const AGREGAR_OBSERVACION = gql`
  mutation AgregarNuevaObservacion($idAvance: String!, $campos: crearObservacion!) {
    agregarNuevaObservacion(idAvance: $idAvance, campos: $campos) {
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

export { EDITAR_AVANCE, CREAR_AVANCE, AGREGAR_OBSERVACION };
