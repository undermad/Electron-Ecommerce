FROM amazoncorretto:21 as build
WORKDIR /app
COPY . .
RUN ./mvnw clean install

FROM amazoncorretto:21-alpine-full
WORKDIR /app

RUN apk add --no-cache bash

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["/bin/sh", "-c", "/wait-for-it.sh database:3306 --timeout=15 -- java -jar /app/app.jar"]

#COPY --from=build /app/target/rest-0.0.1-SNAPSHOT.jar /app/app.jar
#ENTRYPOINT ["/bin/sh", "-c", "/wait-for-it.sh database:3306 --timeout=15 -- java -jar /app/app.jar"]



