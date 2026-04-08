FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install -g pnpm && pnpm install

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN pnpm build

EXPOSE 3030

CMD ["pnpm", "start"]