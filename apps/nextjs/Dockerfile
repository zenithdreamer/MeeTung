FROM node:22-bullseye AS alpine

# Setup environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TURBO_TELEMETRY_DISABLED=1
ENV CI=true
ENV SKIP_ENV_VALIDATION=true
ENV TURBO_DOWNLOAD_LOCAL_ENABLED=1

# Setup pnpm on the alpine base
FROM alpine AS base

# Enable corepack and install turbo
RUN corepack enable
RUN pnpm install turbo --global

# Builder
FROM base AS builder

# Install system dependencies
RUN apt-get update
RUN apt-get install -y libc6-dev

# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune @mee-tung/nextjs --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apt-get update
RUN apt-get install -y libc6-dev
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Generate the database and build types
RUN turbo run build --filter=@mee-tung/db
RUN pnpm db:generate

RUN turbo run build --filter=@mee-tung/nextjs

# Runner
FROM alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/nextjs/next.config.js .
COPY --from=installer /app/apps/nextjs/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/.next/static ./apps/nextjs/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/public ./apps/nextjs/public

CMD node apps/nextjs/server.js