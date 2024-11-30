### **Cómo funcionará la interacción entre el back-end y el front-end**

1. **Rutas:**
   - Se creará una carpeta específica para las rutas, donde cada archivo definirá la lógica para capturar las solicitudes del cliente y enviarlas al servidor.
   - Estas rutas se encargan de identificar qué tipo de operación desea realizar el usuario (por ejemplo, obtener, crear o actualizar datos) y delegan estas tareas a los **controladores** correspondientes.

2. **Controladores:**
   - En otra carpeta estarán los controladores, que contienen la lógica de negocio.
   - Los controladores procesan las solicitudes recibidas desde las rutas, validan los datos enviados por el usuario y determinan qué acciones deben realizarse.
   - Estos controladores no interactúan directamente con la base de datos, sino que delegan esas tareas a los **handlers**.

3. **Handlers:**
   - Los handlers se ubicarán en otra carpeta y serán responsables de interactuar directamente con la base de datos.
   - Su función principal es realizar operaciones como guardar, actualizar, eliminar o recuperar datos.
   - Actúan como el vínculo entre los controladores y la base de datos.

4. **Models:**
   -Seran las estructuras en las que se gusrdarn los datos en mongodb

5. **Clases:**
   - Los handlers harán uso de clases y sus métodos (definidos en otra carpeta) para estructurar y gestionar los datos.
   - Estas clases representan entidades del sistema, como usuarios, proyectos o categorías, y encapsulan tanto atributos como métodos específicos relacionados con ellas.

---

### **Resumen del flujo**
1. **El cliente** envía una solicitud al servidor a través de las rutas.
2. **Las rutas** capturan la solicitud y la envían al controlador correspondiente.
3. **El controlador** procesa la solicitud, valida los datos y delega las operaciones relacionadas con la base de datos al handler.
4. **El handler** interactúa con la base de datos (por ejemplo, MongoDB) para realizar la acción requerida.
5. **Las clases** proporcionan una estructura para los datos y encapsulan la lógica específica relacionada con las entidades del sistema.

---
### para iniciar en producción.
npm start
### para el desarrollo con reinicio automático.
npm run dev