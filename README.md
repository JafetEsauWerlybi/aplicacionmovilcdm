# Selección de herramienta de control de versiones

La herramienta será **GitHub** para trabajar las versiones de la aplicación.

## 4.1 Justificación

Se ha optado por **GitHub** como la herramienta de control de versiones debido a su amplia aceptación en la industria y su compatibilidad con las metodologías de desarrollo ágiles. GitHub ofrece un ecosistema robusto que se integra sin problemas con diversas herramientas de desarrollo y plataformas de despliegue, lo que permite un flujo de trabajo eficiente. Además, su interfaz intuitiva facilita la curva de aprendizaje para nuevos miembros del equipo y mejora la gestión de ramas y versiones. La capacidad de realizar "branches" y "pull requests" promueve un enfoque colaborativo que es esencial para el desarrollo en equipo.

GitHub proporciona funcionalidades avanzadas que facilitan la colaboración y la revisión de código entre los miembros del equipo. Con características como "pull requests", los desarrolladores pueden proponer cambios en el código, los cuales pueden ser revisados y comentados por otros miembros del equipo antes de ser integrados en la rama principal. Esta funcionalidad no solo fomenta una cultura de colaboración, sino que también mejora la calidad del código, ya que permite identificar y corregir errores antes de que se realicen los despliegues. Además, GitHub cuenta con herramientas de gestión de proyectos que permiten vincular tareas y "issues" directamente con el código, facilitando aún más la coordinación y seguimiento del trabajo realizado.

---

# Estrategia de versionamiento

Se ha seleccionado **GitHub Flow** como la estrategia de versionamiento más adecuada para este proyecto debido a su simplicidad y enfoque en el desarrollo ágil. GitHub Flow permite un flujo de trabajo liviano, ideal para equipos que desarrollan características y realizan despliegues de forma continua. Esta estrategia es especialmente beneficiosa para proyectos donde las implementaciones se realizan con frecuencia, ya que facilita la integración de nuevas funcionalidades de manera rápida y eficiente. La estructura de ramas en GitHub Flow se centra en la rama principal (**main**), asegurando que esta siempre esté en un estado desplegable.

## Cómo se usará esta estrategia

1. **Creación de una nueva rama**
   - Se comenzará una nueva tarea creando una rama desde la rama **main** para cada uno de los integrantes desde JIRA.
   - Esta nueva rama permitirá trabajar de manera aislada sin afectar el código en **main** hasta que su trabajo esté listo para revisión.

2. **Realización de cambios**
   - Se harán los cambios en su rama local y realizará commits para guardar el progreso.
   - Cada commit debe ser claro y conciso, describiendo qué se hizo en ese paso.

3. **Sincronización con el repositorio remoto**
   - Una vez que los integrantes estén listos para compartir su trabajo, enviarán los cambios a GitHub.

4. **Creación de un Pull Request (PR)**
   - Cuando un integrante haya completado su tarea, se abrirá un pull request desde la interfaz de GitHub.
   - El pull request debe incluir una descripción detallada de los cambios, qué se ha hecho y, si es necesario, mencionar si se requieren pruebas o revisiones específicas.  
   **Responsable de hacer los PR:** Esaú.

5. **Revisión del código**
   - Esaú, como responsable de las merges, revisará el pull request. Esto incluye revisar el código, probar los cambios localmente si es necesario, y asegurarse de que no haya conflictos con la rama **main**.
   - Si encuentra problemas, dejará comentarios en el pull request para que Adolfo los revise y realice las correcciones necesarias. Adolfo puede hacer los cambios y volver a hacer push a la misma rama, actualizando el pull request.

6. **Aprobación y merge**
   - Una vez que se hayan revisado y esté satisfecho con los cambios y el código esté limpio, aprobará el pull request y hará el merge en la rama **main**. Esau es el único responsable de este paso para asegurarse de que el código en **main** esté siempre estable.
   - Después de la fusión, la rama de características de Adolfo será eliminada ya que los cambios ya están integrados en **main**.  
   **Responsable de hacer merge:** Esau.

7. **Despliegue o pruebas adicionales**
   - Una vez que los cambios han sido fusionados en **main**, la aplicación puede ser desplegada o probada en un entorno más amplio. Esto depende del flujo de trabajo específico del proyecto.

GitHub Flow se integra perfectamente con prácticas de integración continua (CI). Al realizar cambios en ramas individuales y abrir "pull requests", se pueden configurar pipelines de CI que automáticamente ejecuten pruebas y verifiquen que el código no rompa la funcionalidad existente antes de fusionar los cambios en la rama principal. Esto no solo mejora la calidad del código, sino que también asegura que la aplicación esté en un estado constante de preparación para el despliegue, lo que es fundamental para un desarrollo ágil y eficiente.

---

# Estrategia de despliegue del proyecto

Se ha seleccionado la estrategia de **Blue-Green Deployment** como la más adecuada para este proyecto. Esta técnica implica tener dos entornos idénticos: uno activo (Blue) y uno inactivo (Green). Cuando se realiza un despliegue, la nueva versión de la aplicación se implementa en el entorno inactivo. Una vez que se verifica que todo funciona correctamente en el entorno Green, el tráfico se redirige al nuevo entorno, convirtiéndolo en el activo. Esto permite un retroceso fácil y rápido en caso de que surjan problemas con la nueva versión, minimizando el tiempo de inactividad y proporcionando una experiencia fluida para los usuarios. Además, esta estrategia facilita la realización de pruebas en un entorno de producción real antes de la migración completa.

Dentro de la estrategia de versionamiento se mencionan las ramas para cada tarea, teniendo una rama **main** en donde se harán merge de varias ramas, haciendo segunda rama la de entorno de pruebas en donde se podrán tener activas de manera local para poder lanzar esta versión corregida a la de producción. Después de tener la versión activa y corregida, será lanzada dentro de la versión de **bundle** en Google Play Store.

## Entornos

- **Entorno de desarrollo (ramas específicas por tarea):** Este entorno es donde se realizan las pruebas iniciales y el desarrollo de nuevas características. Los desarrolladores pueden implementar cambios y experimentar sin afectar a los usuarios finales.

- **Entorno de Staging (rama main):** Este entorno es una réplica del entorno de producción y se utiliza para realizar pruebas finales antes del despliegue. Aquí se llevan a cabo pruebas de integración y validaciones para asegurar que todo funcione correctamente con la nueva versión.

- **Entorno de producción (aplicación registrada en la Google Play):** Este es el entorno en vivo donde los usuarios acceden a la aplicación. La implementación de nuevas versiones en este entorno se realiza solo después de que han sido probadas y validadas en los entornos de desarrollo y staging.

## Ventajas de esta configuración

- **Pruebas efectivas:** Permite realizar pruebas en un entorno que es casi idéntico al de producción, asegurando que los cambios se validen adecuadamente antes de ser implementados en vivo.

- **Control de calidad:** Facilita la revisión del código y la colaboración entre desarrolladores, mejorando la calidad del software.

- **Despliegue rápido:** Mantiene la capacidad de implementar cambios de manera rápida y eficiente gracias al uso de ramas.

---

## URL del GitHub

[Repositorio del Proyecto](https://github.com/JafetEsauWerlybi/aplicacionmovilcdm)
