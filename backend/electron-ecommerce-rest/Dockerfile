FROM amazoncorretto:21 as build
WORKDIR /app
COPY . .
RUN ./mvnw clean install

FROM amazoncorretto:21-alpine-full
WORKDIR /app
COPY --from=build /app/target/rest-0.0.1-SNAPSHOT.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]



