<<<<<<< HEAD
import React, { useEffect } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> adea0bf90d9bb3a3a58edbe9771f53016b2dd646
import { useMutation, useQuery } from "@apollo/client";
import ButtonLoading from "components/ButtonLoading";
import Input from "components/Input";
import { EDITAR_PERFIL } from "graphql/usuarios/mutations";
import useFormData from "hooks/useFormData";
<<<<<<< HEAD
=======
import { uploadFormData } from "utils/uploadFormData";
>>>>>>> adea0bf90d9bb3a3a58edbe9771f53016b2dd646
import { useUser } from "context/userContext";
import { GET_USUARIO } from "graphql/usuarios/queries";
import { toast } from "react-toastify";

const Profile = () => {
<<<<<<< HEAD
  const { form, formData, updateFormData } = useFormData();
  const { userData } = useUser();
=======
  const [editFoto, setEditFoto] = useState(false);
  const { form, formData, updateFormData } = useFormData();
  const { userData, setUserData } = useUser();
>>>>>>> adea0bf90d9bb3a3a58edbe9771f53016b2dd646

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
<<<<<<< HEAD
=======
      setUserData({ ...userData, foto: dataMutation.editarPerfil.foto });
>>>>>>> adea0bf90d9bb3a3a58edbe9771f53016b2dd646
      toast.success("Perfil modificado con exito");
      refetch();
    }
  }, [dataMutation]);
  
  const submitForm = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    editarPerfil({
      variables: {
        _id: userData._id,
        campos: formData
=======
    const formUploaded = await uploadFormData(formData);

    editarPerfil({
      variables: {
        _id: userData._id,
        campos: formUploaded
>>>>>>> adea0bf90d9bb3a3a58edbe9771f53016b2dd646
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
<<<<<<< HEAD
=======
        {queryData.Usuario.foto && !editFoto ? (
          <div className="flex flex-col items-center">
            <img
              className="h-32"
              src={queryData.Usuario.foto}
              alt="Foto Usuario"
            />
            <button
              type="button"
              onClick={() => setEditFoto(true)}
              className="bg-indigo-300 p-1 my-2 rounded-md text-white"
            >
              Cambiar imagen
            </button>
          </div>
        ) : (
          <div>
            <Input label="Foto" name="foto" type="file" />
            <button
              type="button"
              onClick={() => setEditFoto(false)}
              className="bg-indigo-300 p-1 my-2 rounded-md text-white"
            >
              Cancelar
            </button>
          </div>
        )}
>>>>>>> adea0bf90d9bb3a3a58edbe9771f53016b2dd646
        <ButtonLoading
          text="Confirmar"
          loading={loadingMutation}
          disabled={false}
        />
      </form>
    </div>
  );
};

<<<<<<< HEAD
export default Profile;
=======
export default Profile;
>>>>>>> adea0bf90d9bb3a3a58edbe9771f53016b2dd646
