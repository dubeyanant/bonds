# Bonds - a Next.js + Bun Project

This is a [Next.js](https://nextjs.org/) application powered by [Bun](https://bun.sh/) – a fast, modern JavaScript runtime. This setup replaces Node.js with Bun for improved performance and simplicity in development.

---

## 📦 Features

* ⚡️ Lightning-fast dev server with Bun
* 🧱 Built with Next.js
* 📁 Easy file-based routing
* 🧪 Ready for testing and deployment
* 🛠 Modern DX with Bun's package manager (`bun install`, `bun run`, etc.)

---

## 📁 Project Setup

### 1. **Install Bun**

Make sure you have Bun installed globally:

```bash
curl -fsSL https://bun.sh/install | bash
```

After installation, restart your terminal and verify:

```bash
bun --version
```

### 2. **Clone the Repository**

```bash
git clone https://github.com/dubeyanant/bonds.git
cd your-repo-name
```

### 3. **Install Dependencies**

Use Bun to install dependencies:

```bash
bun install
```

This will install all packages listed in `package.json`.

---

## 🚀 Running the Project

### Development Mode

Start the dev server:

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

To create a production build:

```bash
bun run build
```

Then start the production server:

```bash
bun run start
```

---

## 🛠 Scripts

Here's a quick reference of useful scripts:

| Script          | Description                 |
| --------------- | --------------------------- |
| `bun run dev`   | Run Next.js in development  |
| `bun run build` | Build for production        |
| `bun run start` | Start the production server |
