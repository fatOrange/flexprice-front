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
4. ✅ Start the development server
5. ✅ Open your browser to `http://localhost:3000`

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
variables: create `.env` before building and rebuild whenever it changes.

1. **Configure the frontend environment**

```bash
cp .env.example .env
```

Set at least these values in `.env`:

```dotenv
VITE_APP_ENV=self-hosted
VITE_API_URL=https://api.example.com/v1
```

`VITE_API_URL` must be reachable from your users' browsers and include the
`/v1` suffix. Only public `VITE_*` values belong in `.env`; never put server or
API secrets there, because they are compiled into the public JavaScript bundle.

2. **Build and run with Docker Compose (recommended)**

```bash
docker compose up -d --build
```

This builds the `production` target, injects `.env` as a BuildKit secret
(`frontend_env`), and serves the app at http://localhost:3000.

Docker BuildKit is required. For a direct build:

```bash
FRONTEND_CONFIG_HASH=$(openssl dgst -sha256 .env | cut -d ' ' -f2)

docker build \
  --target production \
  --secret id=frontend_env,src=.env \
  --build-arg FRONTEND_CONFIG_HASH="$FRONTEND_CONFIG_HASH" \
  -t flexprice-frontend .

docker run -d --name flexprice-frontend -p 3000:80 flexprice-frontend
```

The secret keeps `.env` out of the image layers, while the hash invalidates the
cached build step when the configuration changes.

3. **GitHub Actions → Huawei SWR**

Pushing to `main`, or manually running the workflow from `main`, publishes a
`linux/amd64` image built from the `production` target. Other branches are
skipped. Workflow: `.github/workflows/build-swr.yml`.

Configure these under **Settings → Secrets and variables → Actions**:

| Type     | Name                  | Value                                                        |
| -------- | --------------------- | ------------------------------------------------------------ |
| Secret   | `SWR_USERNAME`        | Username with push access to the SWR region/org/repository   |
| Secret   | `SWR_PASSWORD`        | Password or login token for that username                    |
| Variable | `FRONTEND_BUILD_ENV`  | Complete `.env` contents: public `VITE_*` values only        |

`FRONTEND_BUILD_ENV` is multiline dotenv content:

```dotenv
VITE_APP_ENV=self-hosted
VITE_API_URL=https://api.example.com/v1
```

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

Editing `FRONTEND_BUILD_ENV` does not affect already-built images or running
containers; it takes effect only on a new workflow run (or a new local build).
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
