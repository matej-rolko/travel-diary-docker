FROM alpine:3.19

RUN apk add --no-cache nodejs npm python3 make g++

WORKDIR /app

COPY . /app

RUN npm install

# Rebuild bcrypt to match the correct architecture
RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD ["npm", "run", "start"]
