FROM eclipse-temurin:21-jdk-alpine
VOLUME /tmp
COPY target/*.jar app.jar
# Create an empty .env file in the root directory
RUN touch .env
ENTRYPOINT ["java","-jar","/app.jar"]