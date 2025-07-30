FROM maven:3.9.5-sapmachine-21 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
COPY --from=build /target/capstone-project-0.0.1-SNAPSHOT.jar capstone-project.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","capstone-project.jar"]