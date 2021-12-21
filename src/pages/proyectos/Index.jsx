import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { PROYECTOS } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { Dialog } from '@mui/material';
import Input from 'components/Input';
import { Enum_EstadoProyecto, Enum_FaseProyecto, Enum_TipoObjetivo } from "utils/enums";
import ButtonLoading from 'components/ButtonLoading';
import { EDITAR_PROYECTO, EDITAR_OBJETIVO, ELIMINAR_OBJETIVO } from 'graphql/proyectos/mutations';
import useFormData from 'hooks/useFormData';
import PrivateComponent from 'components/PrivateComponent';
import { Link } from 'react-router-dom';
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import { useUser } from 'context/userContext';
import ReactLoading from "react-loading";
import { toast } from 'react-toastify';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled
} from "components/Accordion";
//import ReactLoading from 'react-loading';

const IndexProyectos = () => {
  const { data: queryData, loading } = useQuery(PROYECTOS);

  useEffect(() => {
    console.log("datos proyecto", queryData);
  }, [queryData]);

  if (loading) return <div>Cargando...</div>;

  if (queryData.Proyectos) {
    return (
      <div className="p-10 flex flex-col">
        <div className="flex w-full items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Lista de Proyectos
          </h1>
        </div>
        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
          <div className="my-2 self-end">
            <button
              type="button"
              className="bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400"
            >
              <Link to="/proyectos/nuevo">Crear nuevo proyecto</Link>
            </button>
          </div>
        </PrivateComponent>
        {queryData.Proyectos.map((proyecto) => {
          return <AccordionProyecto proyecto={proyecto} />;
        })}
      </div>
    );
  }

  return <></>;
};

const AccordionProyecto = ({ proyecto }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <AccordionStyled>
        <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
          <div className='flex w-full justify-between'>
            <div className='uppercase font-bold text-gray-100 '>
              {proyecto.nombre} - {proyecto.estado} - {proyecto.fase}
            </div>
          </div>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <PrivateComponent roleList={["ADMINISTRADOR"]}>
            <button
              type="button"
              onClick={() => {
                setShowDialog(true);
              }}
            >
              <i className="mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400" />
            </button>
          </PrivateComponent>
          <PrivateComponent roleList={["LIDER","ESTUDIANTE"]}>
            <InscripcionProyecto
              idProyecto={proyecto._id}
              estado={proyecto.estado}
              inscripciones={proyecto.inscripciones}
            />
          </PrivateComponent>
          <div>Liderado Por: {proyecto.lider.correo}</div>
          <div className="flex">
            {proyecto.objetivos.map((objetivo, index) => {
              return (
                <Objetivo
                  index={index}
                  _id={objetivo._id}
                  idProyecto={proyecto._id}
                  tipo={objetivo.tipo}
                  descripcion={objetivo.descripcion}
                />
              );
            })}
          </div>
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditProyecto _id={proyecto._id} />
      </Dialog>
    </>
  );
};

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading }] = useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
        campos: formData
      }
    });
  };

  useEffect(() => {
    console.log("data mutation", dataMutation);
  }, [dataMutation]);

  return (
    <div className="p-4">
      <h1 className="font-bold">Modificar Estado del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <DropDown
          label="Estado del Proyecto"
          name="estado"
          options={Enum_EstadoProyecto}
        />
        <DropDown
          label="Fase del Proyecto"
          name="fase"
          options={Enum_FaseProyecto}
        />
        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
      </form>
    </div>
  );
};

const Objetivo = ({ index, _id, idProyecto, tipo, descripcion }) => {

  const [showEditDialog, setShowEditDialog] = useState(false);

  const [eliminarObjetivo, { data: dataMutationEliminar, loading: eliminarLoading }] = useMutation(ELIMINAR_OBJETIVO, {
    refetchQueries: [{ query: PROYECTOS }]
  });

  useEffect(() => {
    console.log("data mutation eliminar", dataMutationEliminar);
    if (dataMutationEliminar) {
      toast.success("Objetivo eliminado");
    }
  }, [dataMutationEliminar]);

  const ejecutarEliminacion = () => {
    eliminarObjetivo({ variables: { idProyecto, idObjetivo: _id } });
  };

  if (eliminarLoading) return (
    <ReactLoading
      data-testid="loading-in-button"
      type="spin"
      height={50}
      width={30}
    />
  );

  return (
    <div className="mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl">
      <div className="text-lg font-bold">{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
        <div className="flex my-2">
          <i
            onClick={() => setShowEditDialog(true)}
            className="mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400"
          />
          <i
            onClick={ejecutarEliminacion}
            className="mx-4 fas fa-trash text-red-600 hover:text-red-400"
          />
        </div>
        <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
          <EditarObjetivo
            descripcion={descripcion}
            tipo={tipo} index={index}
            idProyecto={idProyecto} 
            setShowEditDialog={setShowEditDialog}
            />
        </Dialog>
      </PrivateComponent>
    </div>
  );
};

const EditarObjetivo = ({
  descripcion,
  tipo,
  index,
  idProyecto,
  setShowEditDialog
}) => {
  const { form, formData, updateFormData } = useFormData();

  const [editarObjetivo, { data: dataMutation, loading }] = useMutation(
    EDITAR_OBJETIVO,
    {
      refetchQueries: [{ query: PROYECTOS }]
    }
  );

  useEffect(() => {
    if (dataMutation) {
      toast.success("Objetivo editado con exito");
      setShowEditDialog(false);
    }
  }, [dataMutation, setShowEditDialog]);

  const submitForm = (e) => {
    e.preventDefault();
    editarObjetivo({
      variables: {
        idProyecto,
        indexObjetivo: index,
        campos: formData
      }
    }).catch((error) => {
      toast.error("Error editando el objetivo", error);
    });
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900">Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label="Tipo de Objetivo"
          name="tipo"
          required
          options={Enum_TipoObjetivo}
          defaultValue={tipo}
        />
        <Input
          label="Descripcion del objetivo"
          name="descripcion"
          required
          defaultValue={descripcion}
        />
        <ButtonLoading
          text="Confirmar"
          disabled={Object.keys(formData).length === 0}
          loading={loading}
        />
      </form>
    </div>
  );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState('');
  const [crearInscripcion, { data, loading }] = useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter(
        (el) => el.estudiante._id === userData._id
      );
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      console.log(data);
      toast.success("Inscripcion creada con exito");
    }
  }, [data]);

  const confirmarInscripcion = () => {
    crearInscripcion({
      variables: { proyecto: idProyecto, estudiante: userData._id }
    });
  };

  return (
    <>
      {estadoInscripcion !== "" ? (
        <div className="flex flex-col items-start">
          <span>
            Ya estas inscrito en este proyecto y el estado es{" "}
            {estadoInscripcion}
          </span>
          {estadoInscripcion === "ACEPTADO" && (
            <Link
              to={`/avances/${idProyecto}`}
              className="bg-yellow-700 p-2 rounded-lg text-white my-2 hover:bg-yellow-500"
            >
              Avances
            </Link>
          )}
        </div>
      ) : (
        <ButtonLoading
          onClick={() => confirmarInscripcion()}
          disabled={estado === "INACTIVO"}
          loading={loading}
          text="Inscribirme en este proyecto"
        />
      )}
    </>
  );
};

export default IndexProyectos;
