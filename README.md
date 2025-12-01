This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Email Configuration

To enable contact form email notifications:

1. Create a `.env.local` file in the root directory
2. Get your Resend API key from [https://resend.com/api-keys](https://resend.com/api-keys)
3. Add the following variables:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=andreychaika87@gmail.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Note:** The `CONTACT_EMAIL` defaults to `andreychaika87@gmail.com` if not set. The `RESEND_FROM_EMAIL` defaults to `onboarding@resend.dev` (Resend's test domain). For production, you should:
- Get a verified domain in Resend
- Set `RESEND_FROM_EMAIL` to an email from your verified domain (e.g., `noreply@yourdomain.com`)

4. For production, update the `from` email in `app/api/contact/route.ts` to use your verified domain

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Environment Variables on Vercel

**Important:** The `.env.local` file is ignored by Git (see `.gitignore`) and will NOT be uploaded to GitHub or Vercel automatically.

To configure environment variables on Vercel:

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `RESEND_API_KEY` - Your Resend API key
   - `CONTACT_EMAIL` - Email address to receive form submissions (defaults to `andreychaika87@gmail.com`)
   - `RESEND_FROM_EMAIL` - Sender email address (optional, defaults to `onboarding@resend.dev`)
4. Select the environments where these variables should be available (Production, Preview, Development)
5. Click **Save** and redeploy your project

After redeployment, the contact form will work on your Vercel deployment.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
