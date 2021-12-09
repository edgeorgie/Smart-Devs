import React from 'react';
import Carrusel from 'components/Carrousel';

const Index = () => {
  return (
    <div>
      <div align="center">Bienvenido</div>
      <div align="center">
          <Carrusel></Carrusel>
      </div>
      <div className='bg-green-300 h-96'>Index page</div>
    </div>
  );
};

export default Index;
