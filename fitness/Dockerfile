# Step 1: Build the application (The "Builder" stage)
# We use Maven with JDK 21 to compile the Java 21 code
FROM maven:3.9.6-eclipse-temurin-21 AS build_env
WORKDIR /app

# Copy only the pom.xml first to fetch dependencies 
# This layer is cached unless your pom.xml changes
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the jar
COPY src ./src
RUN mvn clean package -DskipTests

# Step 2: Run the application (The "Runtime" stage)
# We use a lightweight JRE (Runtime only) to keep the final image small
FROM eclipse-temurin:21-jre-alpine AS runtime_env
WORKDIR /app

# Copy the built jar from the 'build_env' stage
# We rename it to app.jar for simplicity
COPY --from=build_env /app/target/*.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]