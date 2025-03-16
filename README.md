# Anytype Documentation

This repository contains the official technical documentation for Anytype, a privacy-focused, offline-first personal knowledge management application. The documentation is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator designed for creating documentation websites.

## Repository Structure

The main documentation is located in the `anytype-docs` directory, which contains:

- `docs/`: Markdown files with documentation content
- `src/`: React components and custom CSS
- `static/`: Static assets like images and icons
- `docusaurus.config.js`: Docusaurus configuration
- `sidebars.js`: Documentation sidebar structure

## Documentation Sections

The documentation covers the following core areas of the Anytype system:

- **Frontend**: TypeScript frontend built with React and MobX
- **Backend**: Go backend services and data management
- **Sync**: CRDT-based synchronization and multi-device support
- **Integration**: How frontend and backend components communicate

## Setup Instructions

### Quick Start

For the quickest setup, simply run the included setup script:

```bash
./setup-and-run.sh
```

This script will check for Node.js and npm, install the necessary dependencies, and start the development server.

### Manual Setup

If you prefer to set up manually, follow these steps:

#### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (version 8 or higher)

#### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/konan69/anytype-docs.git
   cd anytype-docs
   ```

2. Navigate to the documentation directory:

   ```bash
   cd anytype-docs
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:

```bash
npm start
```

This will open a browser window with the documentation site at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the static site for production:

```bash
npm run build
```

The built files will be in the `build` directory.

## Deployment

This repository is set up for automatic deployment to GitHub Pages. When you push changes to the `main` branch, GitHub Actions will automatically build and deploy the documentation to GitHub Pages.

If you want to deploy manually, you can use:

```bash
cd anytype-docs
npm run deploy-gh
```

> Note: The `GIT_USER` in the package.json file is already set up for deployment.

## Contributing

If you'd like to contribute to the Anytype documentation:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This documentation is provided under MIT License.
