const Enum_Rol = {
  ADMINISTRADOR: 'Administrador',
  ESTUDIANTE: 'Estudiante',
  LIDER: 'Líder',
};

const Enum_EstadoUsuario = {
  PENDIENTE: 'Pendiente',
  AUTORIZADO: 'Autorizado',
  NO_AUTORIZADO: 'No autorizado',
};

const Enum_EstadoProyecto = {
  ACTIVO: 'Activo',
  INACTIVO: 'Inactivo',
};

const Enum_FaseProyecto = {
  INICIADO: 'Iniciado',
  DESARROLLO: 'En desarrollo',
  TERMINADO: 'Terminado',
  NULO: 'Nulo',
};

const Enum_TipoObjetivo = {
  GENERAL: 'General',
  ESPECIFICO: 'Específico',
};

export { Enum_Rol, Enum_EstadoUsuario, Enum_EstadoProyecto, Enum_TipoObjetivo, Enum_FaseProyecto };
