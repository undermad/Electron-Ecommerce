FROM amazoncorretto:21
WORKDIR /app
COPY . .
RUN ./mvnw clean install

COPY /target/*.jar app.jar
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
















#FROM amazoncorretto:21 as build
#WORKDIR /app
#COPY . .
#RUN ./mvnw clean install
#
#FROM amazoncorretto:21-alpine-full
#WORKDIR /app
#
#RUN #apk add --no-cache bash
#
##COPY wait-for-it.sh /wait-for-it.sh
#RUN #chmod +x /wait-for-it.sh
#
#COPY --from=build /app/target/*.jar /usr/local/lib/app.jar
##ENTRYPOINT ["/bin/sh", "-c", "/wait-for-it.sh database:3306 --timeout=15 -- java -jar /app/app.jar"]
#
#ENTRYPOINT ["java","-jar","/usr/local/lib/app.jar"]
#
#
