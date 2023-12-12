FROM maven:3.9.1-eclipse-temurin-11-alpine
WORKDIR /app
COPY ./springontimize-api ./springontimize-api
COPY ./springontimize-boot ./springontimize-boot
COPY ./springontimize-model ./springontimize-model
COPY ./springontimize-ws ./springontimize-ws
COPY pom.xml .
EXPOSE 33333
RUN mvn install
WORKDIR /app/springontimize-boot
CMD mvn spring-boot:run