import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import ButtonLoading from "components/ButtonLoading";
import Input from "components/Input";
import { EDITAR_PERFIL } from "graphql/usuarios/mutations";
import useFormData from "hooks/useFormData";
import { useUser } from "context/userContext";
import { GET_USUARIO } from "graphql/usuarios/queries";
import { toast } from "react-toastify";

const Profile = () => {
  const { form, formData, updateFormData } = useFormData();
  const { userData } = useUser();

  // falta capturar error de mutacion
  const [editarPerfil, { data: dataMutation, loading: loadingMutation }] =
    useMutation(EDITAR_PERFIL);

  // falta capturar error de query
  const {
    data: queryData,
    loading: queryLoading,
    refetch
  } = useQuery(GET_USUARIO, {
    variables: {
      _id: userData._id
    }
  });

  useEffect(() => {
    if (dataMutation) {
      toast.success("Perfil modificado con exito");
      refetch();
    }
  }, [dataMutation, refetch]);
  
  const submitForm = async (e) => {
    e.preventDefault();

    editarPerfil({
      variables: {
        _id: userData._id,
        campos: formData
      }
    });
  };

  if (queryLoading) return <div>Loading...</div>;

  return (
    <div className="p-10 flex flex-col items-center justify-center w-full">
      <h1 className="font-bold text-2xl text-gray-900">Perfil del usuario</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input
          defaultValue={queryData.Usuario.nombre}
          label="Nombre"
          name="nombre"
          type="text"
          required
        />
        <Input
          defaultValue={queryData.Usuario.apellido}
          label="Apellido"
          name="apellido"
          type="text"
          required
        />
        <Input
          defaultValue={queryData.Usuario.identificacion}
          label="Identificación"
          name="identificacion"
          type="text"
          required
        />
        <ButtonLoading
          text="Confirmar"
          loading={loadingMutation}
          disabled={false}
        />
      </form>
    </div>
  );
};

export default Profile;
