<div align="center">
  <img src="./assets/flexprice_logo.png" height="120" alt="Flexprice Logo"/>
  
  <h1>⚡️ Flexprice Frontend</h1>
  
  <p><strong>Usage-based metering & billing for developers</strong></p>
  
  <p>Build usage-based, credit-based, or hybrid pricing models with full control. Flexprice handles metering, pricing, and invoicing so you can focus on building, not billing.</p>

  <p>
    <a href="https://docs.flexprice.io">Documentation</a> •
    <a href="https://www.loom.com/share/60d8308781254fe0bc5be341501f9fd5">Demo</a> •
    <a href="https://flexprice.io/">Website</a> •
    <a href="https://www.linkedin.com/company/flexpriceio">LinkedIn</a>
  </p>

  <p>
    <a href="https://pkg.go.dev/github.com/flexprice/go-sdk">
      <img src="https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white" alt="Go SDK"/>
    </a>
    <a href="https://pypi.org/project/flexprice">
      <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python SDK"/>
    </a>
    <a href="https://www.npmjs.com/package/@flexprice/sdk">
      <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript SDK"/>
    </a>
  </p>

  <p>
    <a href="https://github.com/flexprice/flexprice-front/releases">
      <img src="https://img.shields.io/github/v/release/flexprice/flexprice-front?style=flat-square" alt="Latest Release"/>
    </a>
    <a href="https://github.com/flexprice/flexprice-front/issues">
      <img src="https://img.shields.io/github/issues/flexprice/flexprice-front?style=flat-square" alt="GitHub Issues"/>
    </a>
    <a href="https://github.com/flexprice/flexprice-front/stargazers">
      <img src="https://img.shields.io/github/stars/flexprice/flexprice-front?style=flat-square" alt="GitHub Stars"/>
    </a>
    <a href="https://github.com/flexprice/flexprice-front/network">
      <img src="https://img.shields.io/github/forks/flexprice/flexprice-front?style=flat-square" alt="GitHub Forks"/>
    </a>
    <a href="https://github.com/flexprice/flexprice-front/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/flexprice/flexprice-front?style=flat-square" alt="License"/>
    </a>
  </p>
</div>

<h5 align="center">

[Documentation](https://docs.flexprice.io) • [Demo](https://www.loom.com/share/60d8308781254fe0bc5be341501f9fd5) • [Website](https://flexprice.io/) • [LinkedIn](https://www.linkedin.com/company/flexpriceio)

[![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)](https://pkg.go.dev/github.com/flexprice/go-sdk) [![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://pypi.org/project/flexprice) [![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.npmjs.com/package/@flexprice/sdk) 

## 📋 Table of Contents

- [🏗️ Open Architecture](#-open-architecture)
- [🚀 Quick Setup](#-quick-setup-one-click-development)
- [🛠️ Manual Development Setup](#️-manual-development-setup)
- [🏗️ Project Structure](#️-project-structure)
- [🌐 Self-Hosting Guide](#-self-hosting-guide)
- [📚 Available Scripts](#-available-scripts)
- [🔧 Common Development Tasks](#-common-development-tasks)
- [🔍 Troubleshooting](#-troubleshooting)
- [📚 Documentation](#-documentation)
- [🚀 Latest Releases](#-latest-releases)
- [👨🏻‍💻 Let's Build Together!](#-lets-build-together-)
- [🤝 Contributing](#-contributing)
- [🆘 Need Help?](#-need-help)
- [🔒 Security](#-security)
- [📝 Changelog](#-changelog)
- [📄 License](#-license)

---

## 🏗️ Open Architecture
The Flexprice core (metering, credits, pricing, billing) has an open and composable design.

<p align="center">
  <img align="center" src="./assets/open-arch.jpg" alt="open architechture"/>
</p>

Your application, whether it's running backend APIs, AI agents, or custom workflows, can send usage data to Flexprice. You can directly stream data from data warehouses or analytics pipelines as well.

At the core, Flexprice processes this data in real time. We handle everything that usually ends up as custom logic built by developers. Our platform calculates pricing based on the customer’s plan, applies any prepaid or promotional credits, enforces feature limits, and generates accurate invoices automatically. Whether you're using seat-based subscriptions, usage-based pricing, or prepaid credit bundles, you can set up and iterate on your pricing model without writing billing infrastructure from scratch.

After billing is computed, our platform connects to your existing tools for payments, CPQ, CRM, and accounting, ensuring billing information flows into the systems your business already uses. It can sync invoices to your payment processor, update customer data in your CRM, and push revenue numbers to your accounting tools.

With this architecture, you get full control over how billing works inside your product, while saving your team from the complexity of maintaining it all.

## ✨ Features

- 🎯 **Usage Metering** - Real-time tracking of custom usage events
- 💳 **Credit Management** - Prepaid and promotional credit systems
- 📊 **Flexible Pricing** - Support for usage-based, subscription, and hybrid models
- 🔧 **Feature Management** - Entitlements and usage limits per plan
- 📄 **Automated Invoicing** - Clear, accurate invoices with real-time data
- 🔌 **Easy Integration** - Simple SDKs for Go, Python, and JavaScript
- 🏗️ **Self-Hostable** - Open source with full control over your infrastructure
- 📈 **Real-time Analytics** - Comprehensive usage and billing insights

## 🚀 Quick Setup (One-Click Development)

[![Latest Release](https://img.shields.io/github/v/release/flexprice/flexprice-front?style=flat-square&label=Current%20Version)](https://github.com/flexprice/flexprice-front/releases)

### Prerequisites

- **Node.js** 16+ and npm/yarn
- **Git** for version control
- **VS Code** (recommended) or any modern editor
- **Docker** (optional, for containerized development)

### One-Click Setup Script

```bash
# Clone the flexprice frontend repository
git clone https://github.com/flexprice/flexprice-front
cd flexprice-front

# Run the automated setup script
./setup
```

### Alternative: Install Latest Release

```bash
# Download and install the latest release
curl -s https://api.github.com/repos/flexprice/flexprice-front/releases/latest | grep "browser_download_url.*tar.gz" | cut -d '"' -f 4 | wget -qi -
tar -xzf flexprice-front-*.tar.gz
cd flexprice-front-*
./setup
```

The setup script will automatically:

1. ✅ Set up environment variables
2. ✅ Install all dependencies
3. ✅ Build Docker image (if Docker is available)
4. ✅ Start the frontend container on host port 3000
5. ✅ Open your browser to `http://localhost:3000`

The container's Nginx listens on port 80 and is published as host port 3000
(`3000:80`, on all host interfaces); use the tailnet URL
`http://pay-jd-245-291017.tailaa2a30.ts.net:3000` for shared access (see
[Docker Deployment](#docker-deployment)). `npm run dev` is the local Vite
development server on `http://localhost:3000`, so stop the container before
starting it. On a host with a public interface, restrict port 3000 as described
in step 3 of [Docker Deployment](#docker-deployment).

## 🛠 Manual Development Setup

1. **Clone & Install**

```bash
git clone https://github.com/flexprice/flexprice-front
cd flexprice-front
npm install
```

2. **Environment Setup**

```bash
# Copy environment template
cp .env.example .env

# Configure these variables in .env.local:
VITE_SUPABASE_URL=your-supabase-utl

VITE_SUPABASE_ANON_KEY=your-supabse-anon-key

VITE_API_URL=http://localhost:8080/v1 or <your-backend-url>

VITE_ENVIRONMENT=development

```

3. **Start Development**

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app running!

### Localization

The UI ships with English (`en`), Arabic (`ar`), and Simplified Chinese (`zh-CN`) translations. English is the default and fallback language; Arabic is RTL and Simplified Chinese is LTR.

- Translation resources live in `src/i18n/locales/<locale>/<namespace>.json`. Every locale must keep the same keys as `src/i18n/locales/en` (including plural keys such as `_one`/`_other`, even when a language uses fewer plural forms).
- The language selector in the header only appears when more than one locale is allowed.
- When `allowedLocales` is not configured, all supported locales — including `zh-CN` — are available. An explicit list is respected as-is, so include `zh-CN` to offer Chinese:

```dotenv
VITE_AUTH_CONFIG={"allowedLocales":["en","zh-CN"]}
```

- To change the initial language, set `VITE_DEFAULT_LOCALE` (for example `VITE_DEFAULT_LOCALE=zh-CN`). Unknown values fall back to `en`, and a language persisted from a previous session takes precedence over this default.

## 🏗 Project Structure

```
src/
├── components/          # UI Components
│   ├── atoms/          # Basic UI elements
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Card/
│   ├── molecules/      # Composite components
│   │   ├── Forms/
│   │   ├── Charts/
│   │   └── Tables/
│   └── organisms/      # Complex UI sections
│       ├── Dashboard/
│       ├── Billing/
│       └── Analytics/
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── store/              # State management
├── utils/              # Helper functions
├── models/             # TypeScript types
└── core/              # Core business logic
```

## 🌐 Self-Hosting Guide

### Docker Deployment

The production image is Nginx serving the compiled SPA. Vite configuration is
baked into the browser bundle at build time, so there are no runtime `-e`
variables: create a dotenv file before building and rebuild whenever it
changes. Docker Compose reads `.env` by default; set `FRONTEND_ENV_FILE` to
build from a different file.

1. **Configure the frontend environment**

For local development or a generic self-hosted deployment, start from the
checked-in example:

```bash
cp .env.example .env
```

Set at least these values in `.env`:

```dotenv
VITE_APP_ENV=self-hosted
VITE_API_URL=https://api.example.com/v1
```

For this production deployment (served on the tailnet at
`http://pay-jd-245-291017.tailaa2a30.ts.net:3000`), create a separate
`.env.production` instead. `.env.*` is gitignored, so that file stays local and
must exist on every build machine:

```dotenv
VITE_APP_ENV=self-hosted
VITE_AUTH_PROVIDER=flexprice
VITE_API_URL=http://pay-jd-245-291017.tailaa2a30.ts.net:8000/v1
```

Do not set `VITE_SSO_TENANT_ID` unless a single tenant should be preselected;
without it the login page shows the SSO button on a `?sso=<tenant_id>` link.
Do not add other tenant IDs, API keys, or secrets: every `VITE_*` value is
compiled into the public JavaScript bundle.

`VITE_API_URL` must be reachable from your users' browsers and include the
`/v1` suffix. Only public `VITE_*` values belong in these files; never put
server or API secrets there.

2. **Build and run with Docker Compose (recommended)**

Local development/default `.env`:

```bash
docker compose up -d --build
```

Production `.env.production`:

```bash
FRONTEND_ENV_FILE=.env.production docker compose build
FRONTEND_ENV_FILE=.env.production docker compose up -d
```

`FRONTEND_ENV_FILE` selects the BuildKit secret source and defaults to `.env`,
so the local flow above is unchanged. Keep it set for both commands so Compose
never falls back to a `.env` that may not exist on the production build host.
Either command builds the `production` target, injects the selected file as the
`frontend_env` secret, and publishes the container's port 80 as host port 3000
with the mapping `3000:80`, so it is reachable locally at
http://localhost:3000 and, on the tailnet, at
http://pay-jd-245-291017.tailaa2a30.ts.net:3000. As with any Docker port
mapping, `3000:80` listens on all host interfaces (IPv4 and IPv6), not only the
tailnet; step 3 covers the firewall and ACL requirements that follow.

Docker BuildKit is required. For a direct build, pass the same file explicitly:

```bash
ENV_FILE=.env.production   # or .env for local builds
FRONTEND_CONFIG_HASH=$(openssl dgst -sha256 "$ENV_FILE" | cut -d ' ' -f2)

docker build \
  --target production \
  --secret id=frontend_env,src="$ENV_FILE" \
  --build-arg FRONTEND_CONFIG_HASH="$FRONTEND_CONFIG_HASH" \
  -t flexprice-frontend .

docker run -d --name flexprice-frontend -p 3000:80 flexprice-frontend
```

The secret keeps the dotenv file out of the image layers, while the hash
invalidates the cached build step when the configuration changes.

3. **Expose the container on the tailnet**

The image runs Nginx on port 80 inside the container and falls back to
`index.html` for client-side routes. This deployment publishes that port
directly as host port 3000 (`3000:80`, as shown above); no reverse proxy is
required. Clients on the tailnet open
`http://pay-jd-245-291017.tailaa2a30.ts.net:3000`, and the browser calls the API
directly at `http://pay-jd-245-291017.tailaa2a30.ts.net:8000/v1`.

Prerequisites on the Docker host:

- Tailscale is installed and the host is signed in to the same tailnet as the
  intended users (`tailscale up`; `tailscale status` lists the host).
- MagicDNS is enabled in the tailnet so
  `pay-jd-245-291017.tailaa2a30.ts.net` resolves for clients.
- The tailnet policy (ACL) allows the intended users, groups, or devices to
  reach this host on TCP ports 3000 (frontend) and 8000 (API). The default
  allow-all policy already does this; a restrictive policy needs an explicit
  grant such as:

```json
{
  "grants": [
    {
      "src": ["group:flexprice-users"],
      "dst": ["tag:flexprice-front"],
      "ip": ["tcp:3000", "tcp:8000"]
    }
  ]
}
```

Tag the Docker host `tag:flexprice-front` (or substitute your own group and
host tag), and keep the grant scoped to those two ports. Tailscale ACLs only
govern traffic on the tailnet; they do not protect the host's other network
interfaces.

**Exposure and firewall:** Docker publishes `3000:80` and `8000:8080` on all
host interfaces (IPv4 and IPv6), so both ports are reachable from any network
the host is attached to, including a public interface. Docker inserts DNAT
rules that can bypass host firewall input rules (plain `ufw` rules, for
example, do not reliably filter published container ports). Restrict ports 3000
and 8000 with the cloud security group or network firewall in front of the
host — allow them only from the tailnet or trusted networks, and verify from
outside that both ports are closed. If the host must not be reachable outside
the tailnet, a default-deny ingress policy for both ports is required.

Open `http://pay-jd-245-291017.tailaa2a30.ts.net:3000` from any device in the
tailnet. No `tailscale serve` or `tailscale funnel` command is needed for this
deployment; `tailscale funnel` would additionally publish a Serve listener to
the public internet.

> **HTTP and browser secure contexts:** the deployment URL is plain HTTP, so
> browsers do not treat it as a secure context. Secure-context-only APIs such
> as `navigator.clipboard` and `crypto.randomUUID` may be unavailable or fail.
> Copy-to-clipboard actions and the customer-portal top-up/invoice idempotency
> keys rely on those APIs. If those flows are required, use the optional HTTPS
> listener below.

Optional HTTPS alternative: Tailscale Serve can terminate HTTPS on port 443
(requires HTTPS certificates enabled for the tailnet and MagicDNS) and proxy to
the published host port:

```bash
tailscale serve --bg --https=443 http://127.0.0.1:3000
```

That serves `https://pay-jd-245-291017.tailaa2a30.ts.net/` (port 443 is
implicit) and provides a browser secure context. It is not the requested
deployment URL; production access remains
`http://pay-jd-245-291017.tailaa2a30.ts.net:3000`. If you switch to the HTTPS
origin, rebuild the frontend with an HTTPS `VITE_API_URL`, update the backend
CORS allowlist, and update the SAML `dashboard_url` to that HTTPS origin.

Backend settings:

- **CORS:** the API at `http://pay-jd-245-291017.tailaa2a30.ts.net:8000/v1`
  must allow the exact frontend origin
  `http://pay-jd-245-291017.tailaa2a30.ts.net:3000` — scheme, host, and port,
  with no trailing slash. A wildcard is not sufficient when the browser sends
  credentials.
- **SAML:** SAML cannot be used with this plain-HTTP deployment. When the
  backend enables SAML and its base/dashboard URL is not loopback, it requires
  HTTPS, and browsers and most identity providers reject insecure callback
  URLs. To enable SAML, serve the frontend over HTTPS (for example with the
  Serve listener above), rebuild with an HTTPS `VITE_API_URL` so the API is not
  blocked as mixed content, and set the backend SAML `dashboard_url` (callback)
  to `https://pay-jd-245-291017.tailaa2a30.ts.net/auth/callback`; the frontend
  handles that path with the `/auth/callback` route. Do not enable SAML on the
  HTTP deployment.

The API URL and origins are build-time or server-side settings; there is no
frontend runtime configuration for them. The frontend bundle targets
`http://pay-jd-245-291017.tailaa2a30.ts.net:8000/v1`.

4. **GitHub Actions → Huawei SWR**

Pushing to `main`, or manually running the workflow from `main`, publishes a
`linux/amd64` image built from the `production` target. Other branches are
skipped. Workflow: `.github/workflows/build-swr.yml`.

Configure these secrets under **Settings → Secrets and variables → Actions**:

| Type   | Name           | Value                                                      |
| ------ | -------------- | ---------------------------------------------------------- |
| Secret | `SWR_USERNAME` | Username with push access to the SWR region/org/repository |
| Secret | `SWR_PASSWORD` | Password or login token for that username                  |

The workflow embeds the production frontend dotenv inline; no repository
variable is needed:

```dotenv
VITE_APP_ENV=self-hosted
VITE_AUTH_PROVIDER=flexprice
VITE_API_URL=http://pay-jd-245-291017.tailaa2a30.ts.net:8000/v1
```

These are public `VITE_*` values compiled into the browser bundle. The workflow
writes them to a temporary dotenv file at build time. To change them, edit the
`Prepare frontend configuration` step in `.github/workflows/build-swr.yml` and
push to `main` (or start a new workflow run). The local `.env.production` is
independent of the workflow.

The repository `swr.cn-east-3.myhuaweicloud.com/digitprint/flexprice-front` must
already exist, and the credentials must be allowed to push to that repository.
Each build publishes:

- `latest` — mutable, tracks the most recent successful `main` build.
- `sha-${GITHUB_SHA}-${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT}` — immutable, for
  pinned deploys and rollbacks.
- The image digest, reported in the workflow run summary.

To pull and run the published image:

```bash
export SWR_USERNAME=your-swr-username
read -rsp "SWR password: " SWR_PASSWORD; echo
printf '%s' "$SWR_PASSWORD" | docker login swr.cn-east-3.myhuaweicloud.com \
  --username "$SWR_USERNAME" --password-stdin
unset SWR_PASSWORD

docker pull swr.cn-east-3.myhuaweicloud.com/digitprint/flexprice-front:latest
docker run -d --name flexprice-frontend-swr -p 3000:80 \
  swr.cn-east-3.myhuaweicloud.com/digitprint/flexprice-front:latest
```

The container's port 80 is published as host port 3000 (`3000:80`), matching
`docker-compose.yml` and the setup scripts, and is reachable on the tailnet at
`http://pay-jd-245-291017.tailaa2a30.ts.net:3000` without Tailscale Serve. The
all-interface exposure, firewall, and ACL caveats from step 3 apply to this port
and to the API on 8000.

Editing the inline dotenv in `.github/workflows/build-swr.yml` does not affect
already-built images or running containers; it takes effect only on a new
workflow run (or a new local build).
SWR images are `linux/amd64`, so on ARM hosts use an amd64 machine or platform
emulation.

### Manual Deployment

1. **Build the application**

```bash
npm run build
```

2. **Serve the static files**

```bash
# Using nginx
cp nginx.conf /etc/nginx/conf.d/flexprice.conf
nginx -s reload

# Or using serve
npx serve -s dist
```

## 📚 Available Scripts

```bash
# Development
npm run dev           # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint errors
npm run format      # Format with Prettier
```

## 🔧 Common Development Tasks

### Adding New Features

1. Create a feature branch:

```bash
git checkout -b feat/new-feature
```

2. Create component structure:

```bash
mkdir -p src/components/organisms/NewFeature
touch src/components/organisms/NewFeature/index.tsx
touch src/components/organisms/NewFeature/NewFeature.test.tsx
```

3. Add route (if needed):

```tsx
// src/core/routes/Routes.tsx
import NewFeature from '@/components/organisms/NewFeature'

// Add to routes array
{
  path: '/new-feature',
  element: <NewFeature />
}
```

### Styling Components

We use Tailwind CSS with custom configurations:

```tsx
// Example component with Tailwind
const Button = ({ children }) => <button className='px-4 py-2 bg-primary hover:bg-primary-dark rounded-md'>{children}</button>;
```

## 🔍 Troubleshooting

### Common Issues

1. **Build Failures**

```bash
# Clear dependencies and cache
rm -rf node_modules
rm -rf .vite
npm install
```

2. **Stale Development Server**

```bash
# Reset development server
rm -rf node_modules
rm -rf .vite
npm install
npm run dev
```

## 📚 Documentation

Our comprehensive documentation covers all aspects of the FlexPrice frontend:

### Getting Started

- [Getting Started Guide](docs/getting-started.md) - Quick setup and first steps
- [Project Structure](docs/project-structure.md) - Understanding the codebase organization
- [Conventions](docs/conventions.md) - Coding standards and best practices

### Development Guides

- [Component Guidelines](docs/component-guidelines.md) - Building and maintaining UI components
- [State Management](docs/state-management.md) - Managing application state with Zustand and Context
- [API Integration](docs/api-integration.md) - Working with the backend API
- [Onboarding Guide](docs/onboarding.md) - New developer onboarding process

### Additional Resources

<!-- - [FAQ](docs/FAQ.md) - Common questions and answers -->

- [Flexprice Docs](https://docs.flexprice.io) - Documenttation for Flexprice sdk and Apis
- [Contributing Guide](docs/getting-started.md) - How to contribute to the project

## 🚀 Latest Releases

<div align="center">
  <a href="https://github.com/flexprice/flexprice-front/releases">
    <img src="https://img.shields.io/github/v/release/flexprice/flexprice-front?include_prereleases&style=for-the-badge&label=Latest%20Release" alt="Latest Release"/>
  </a>
  <a href="https://github.com/flexprice/flexprice-front/releases">
    <img src="https://img.shields.io/github/release-date/flexprice/flexprice-front?style=for-the-badge&label=Release%20Date" alt="Release Date"/>
  </a>
</div>

### 📦 Download Latest Release

```bash
# Download the latest release
curl -s https://api.github.com/repos/flexprice/flexprice-front/releases/latest | grep "browser_download_url.*tar.gz" | cut -d '"' -f 4 | wget -qi -

# Or clone the latest release
git clone --depth 1 --branch $(curl -s https://api.github.com/repos/flexprice/flexprice-front/releases/latest | grep "tag_name" | cut -d '"' -f 4) https://github.com/flexprice/flexprice-front.git
```

### 🔄 Release History

[![GitHub Release](https://img.shields.io/github/release-date/flexprice/flexprice-front?style=flat-square)](https://github.com/flexprice/flexprice-front/releases)
[![GitHub Releases](https://img.shields.io/github/downloads/flexprice/flexprice-front/total?style=flat-square)](https://github.com/flexprice/flexprice-front/releases)
[![GitHub All Releases](https://img.shields.io/github/downloads/flexprice/flexprice-front/total?style=flat-square&label=Total%20Downloads)](https://github.com/flexprice/flexprice-front/releases)

## 👨🏻‍💻 Let's Build Together! 👩🏻‍💻

Whether you're a newbie coder or a wizard 🧙‍♀️, your perspective is golden. Take a peek at our:

📜 [Contribution Guidelines](CONTRIBUTING.md)

🏗️ [Local Development Setup](docs/getting-started.md)

❤️ [Code of Conduct](code_of_conduct.md)

## Contributors

<a href="https://github.com/flexprice/flexprice-front/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=flexprice/flexprice-front" />
</a>

<!-- ## Repo Activity -->

<!-- ![Alt](https://repobeats.axiom.co/api/embed/4d6e208eab20ff0615787615c4fa022591adfa6b.svg 'Repobeats analytics image') -->

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/flexprice/flexprice-front.git`
3. **Create** a feature branch: `git checkout -b feat/amazing-feature`
4. **Make** your changes
5. **Commit** with a clear message: `git commit -m "Add amazing feature"`
6. **Push** to your branch: `git push origin feat/amazing-feature`
7. **Open** a Pull Request

### 📋 Contribution Types

- 🐛 **Bug fixes** - Help us squash bugs
- ✨ **New features** - Add functionality that others can use
- 📚 **Documentation** - Improve our docs and guides
- 🎨 **UI/UX improvements** - Make the interface better
- ⚡ **Performance** - Optimize code and improve speed
- 🧪 **Tests** - Add or improve test coverage

### 🔍 Before You Start

- Check existing [issues](https://github.com/flexprice/flexprice-front/issues) and [discussions](https://github.com/flexprice/flexprice-front/discussions)
- Read our [Contributing Guide](CONTRIBUTING.md) for detailed guidelines
- Follow our [Code of Conduct](code_of_conduct.md)
- Ensure your code follows our [coding standards](docs/conventions.md)

### 💡 Need Help?

- 💬 Join our [Discussions](https://github.com/flexprice/flexprice-front/discussions)
- 📧 Email us at dev@flexprice.io
- 🐛 Report issues via [GitHub Issues](https://github.com/flexprice/flexprice-front/issues)

## 🆘 Need Help?

<!-- - Join our [Discord Community](https://discord.gg/flexprice) -->

- 📧 Email: support@flexprice.io
- 🐛 [Report Issues](https://github.com/flexprice/flexprice-front/issues)
- 💬 [Discussions](https://github.com/flexprice/flexprice-front/discussions)
<!-- - Check our [FAQ](docs/FAQ.md) -->

## 🔒 Security

We take security seriously. If you discover a security vulnerability, please follow these steps:

1. **Do not** open a public issue
2. Email us at security@flexprice.io
3. Include a detailed description of the vulnerability
4. We'll respond within 48 hours

For more information, see our [Security Policy](SECURITY.md).

## 📝 Changelog

We maintain a detailed changelog of all notable changes to this project. See our [CHANGELOG.md](CHANGELOG.md) for the complete history.

### 🔄 Dynamic Release Information

<div align="center">
  <a href="https://github.com/flexprice/flexprice-front/releases">
    <img src="https://img.shields.io/github/v/release/flexprice/flexprice-front?include_prereleases&style=for-the-badge&label=Latest%20Release" alt="Latest Release"/>
  </a>
  <a href="https://github.com/flexprice/flexprice-front/releases">
    <img src="https://img.shields.io/github/release-date/flexprice/flexprice-front?style=for-the-badge&label=Released" alt="Release Date"/>
  </a>
</div>

### 📋 Recent Updates

```bash
# Get latest release info
curl -s https://api.github.com/repos/flexprice/flexprice-front/releases/latest | jq '.tag_name, .published_at, .body'
```

### 🏷️ All Releases

[![GitHub Releases](https://img.shields.io/github/release-date/flexprice/flexprice-front?style=flat-square)](https://github.com/flexprice/flexprice-front/releases)
[![GitHub All Releases](https://img.shields.io/github/downloads/flexprice/flexprice-front/total?style=flat-square&label=Total%20Downloads)](https://github.com/flexprice/flexprice-front/releases)

## 📄 License

This project is licensed under the [AGPLv3 License](LICENSE) - see the [LICENSE](LICENSE) file for details.

Flexprice follows an "Open Core" model where the core technology is fully open source, while some enterprise features may require a commercial license.

---

<div align="center">
  <p>Made with ❤️ by the <a href="https://flexprice.io">FlexPrice Team</a></p>
  <p>
    <a href="https://github.com/flexprice/flexprice-front/stargazers">⭐ Star us on GitHub</a> •
    <a href="https://twitter.com/flexpriceio">🐦 Follow us on Twitter</a> •
    <a href="https://www.linkedin.com/company/flexpriceio">💼 Connect on LinkedIn</a>
  </p>
</div>
