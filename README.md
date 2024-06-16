# Trabajo fin de Master

## Guía de ejecución

1. Situarnos en la raíz del proyecto y en caso de NO ser la primera vez ejecutar el comando `docker compose build` para compilar las imágenes con el código actual.
2. Desplegar la aplicación con el comando `kubectl apply -f k8s`, este paso puede tardar un poco. Al finalizar la aplicación estará disponible en el siguiente enlace http://localhost:30080