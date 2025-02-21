
FROM node:22


WORKDIR /front-end


COPY package*.json ./


RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

ENV PORT=5173

EXPOSE 5173


CMD ["npm", "run", "client", "--", "--host", "0.0.0.0"]
