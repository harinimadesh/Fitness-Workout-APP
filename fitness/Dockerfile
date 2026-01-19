# Stage 1: Build the application
# Use Maven with JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /app

# 1. Copy pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Copy source and build the jar
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime environment
# Use a slim JRE 21 to keep the final image size under 200MB
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Copy the jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Render dynamic port binding:
# We do NOT use 'EXPOSE 8080' because Render uses a random port ($PORT)
# Spring Boot will automatically use $PORT because of our application.properties setting.

# Run with memory constraints to stay within Render's Free Tier limits (512MB)
ENTRYPOINT ["java", "-Xmx384m", "-Xms384m", "-jar", "app.jar"]