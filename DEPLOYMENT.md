### Deploying project

Para desplegar el proyecto seguir los siguientes pasos:

Primero, compilar el frontend.
```
npm run build
```

Después, ejecutar el comando de despliegue de firebase:
```
firebase deploy
```
Este comando realiza las siguientes tareas
* Despliega el frontend con Firebase Hosting.
* Despliega el backend con Firebase Functions.

Finalmente, ingresar a la liga http://catalogo-soluciones.web.app (liga temporal) para ver los cambios en producción.