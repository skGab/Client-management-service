# Stage 1: Building the application
FROM node:20 as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Setting up the production environment
FROM node:20
WORKDIR /app
COPY package*.json .

# Install production dependencies only
RUN npm install

# Copy the entire node_modules directory from the build stage
COPY --from=build /app/node_modules /app/node_modules

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist

# Expose the port and define the start command
EXPOSE 8080
CMD npm run start:prod
