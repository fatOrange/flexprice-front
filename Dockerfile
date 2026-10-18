# syntax=docker/dockerfile:1.7

# Stage 1: build the static Vite bundle
FROM --platform=$BUILDPLATFORM node:22.22-alpine AS build

WORKDIR /app

# Dependencies are copied separately so source changes reuse the install layer.
COPY package.json package-lock.json ./
ENV HUSKY=0
RUN npm ci

# Environment files are excluded from the build context (.dockerignore) and
# injected as the frontend_env BuildKit secret below, so they never enter an
# image layer.
COPY . .

# FRONTEND_CONFIG_HASH is the SHA-256 of the dotenv payload. BuildKit does not
# include secret contents in its cache key; this ARG changes the build RUN's
# environment so a configuration change invalidates the cached build.
ARG FRONTEND_CONFIG_HASH
RUN --mount=type=secret,id=frontend_env,required=true,target=/app/.env.production \
    node --input-type=module -e "import { loadEnv } from 'vite'; const env = loadEnv('production', process.cwd(), 'VITE_'); if (!(env.VITE_API_URL ?? '').trim()) { console.error('ERROR: VITE_API_URL is missing or empty in frontend_env (.env.production).'); process.exit(1); }" \
 && npm run build

# Stage 2: static runtime
FROM nginx:alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
