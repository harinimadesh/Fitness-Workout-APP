# Step 1: Build the application
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# Copy only the pom.xml first to fetch dependencies (speeds up builds)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the jar
COPY src ./src
RUN mvn clean package -DskipTests

# Step 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]