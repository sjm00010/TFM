# Trabajo fin de Master

## Guía de ejecución

1. Generar las imágenes de Docker en local accediendo a la carpeta *API-TFG* y *FRONT-TFG*, y en cada una de las carpetas ejecuatando los comandos `docker image build . --tag "apiwipace:latest"` y `docker image build . --tag "frontwipace:latest"` respectivamente.
2. Desplegar la aplicación con el comando `kubectl apply -f k8s`, este paso puede tardar un poco. Al finalizar la aplicación estará disponible en el siguiente enlace http://localhost:30080
