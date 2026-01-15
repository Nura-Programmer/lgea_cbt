# CBT Portal
The Intelligent CBT System

## Getting Started

First, create .env file on the project's root dir
create 2 veriables:

```bash
DATABASE_URL="your database secret"
SESSION_SECRET="Your session secret"
```

### To generate secret run
```bash 
openssl rand -base64 32
```

then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## For production

Run:

```bash
npm install

# then
npm run build
# or
npx prisma generate && next build
```

### Don't forget to add the required environment variables
Generally two (2) are required:
- DATABASE_URL (Get it from your mysql server e.g.: [AIVEN server](https://aiven.io))
- SESSION_SECRET (You can generate one using ```bash openssl rand -base64 32 ```)

*To see the result:* Open your browser and navigate to the URL given by your hosting server.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [SMART CBT Portal Documentation](https://github.com/Nura-Programmer/lgea_cbt.git) - learn about CBT features and API.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The project was deployed for development purposes at [LGEA CBT](https://cbt-kappa-opal.vercel.app) by the creators of the app.
