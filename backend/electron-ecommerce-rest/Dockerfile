FROM amazoncorretto:21-alpine-full
LABEL authors="Dominik Tworek"

WORKDIR /app

COPY target/rest-0.0.1-SNAPSHOT.jar /app/app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]



