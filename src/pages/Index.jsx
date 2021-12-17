import React from 'react';
import Carrusel from 'components/Carrousel';

import '../styles/clases_index.css'

const Index = () => {
  return (
    <div class="index">
      <div class="titulo" align="center"> Bienvenido  </div>
      <div class="carrusel" align="center">
          <Carrusel></Carrusel>
      </div>

      <div class="body">
      <p>Sobre Nosotros</p>
        Somos Un Grupo de Estudiantes de MISION TIC 2022 en desarrollo de aplicaciones WEB en temas de React, Graphql, Mongo y demas tecnologias necesarias para crear un aplicativo web que pueda ayudar a gestionar 
        todos los royectos que los estudiantes crearan durante su periodo del semestre
      </div>


      <div class="body">
      <p>Misión</p>
        Captar, procesar y transmitir conocimiento, ideas y herramientas innovadoras y útiles para las empresas que les ayuden a solucionar problemas y afrontar mejor sus nuevos retos y proyectos.

        Crear soluciones nuevas y sistemas más eficientes basados en tecnologías asequibles, que aporten valor y optimicen el uso de los recursos, beneficien a las personas, a las empresas y a toda la sociedad.

        Buscar, consolidar y mantener un equipo excelente de profesionales para abordar con éxito las distintas iniciativas de nuestros clientes y ofrecer unos servicios de calidad en un entorno de respeto, colaboración y confianza mutua.

        Difundir la Calidad, la Responsabilidad Social, la Igualdad, el respeto al Medio Ambiente y en general las buenas prácticas, herramientas y sistemas de Gestión de Proyectos para mejorar la eficiencia y la gestión de las Empresas y contribuir al logro global de los Objétivos para el Desarrollo Sostenible y una sociedad más justa.
      </div>

      
 
    </div>
  );
};

export default Index;
