FROM node:20-alpine
WORKDIR /app

# copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies. Use --omit=dev to skip devDependencies.
RUN npm install --omit=dev

# copy app source
COPY . .

EXPOSE 1080
CMD ["npm","start"]
