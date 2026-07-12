# dream logic backend setup

this admin repo manages the private operations side: admin login, live site links, buyers, subscriptions, payments, pricing, analytics checks, users, content, and product events.

## 1. accounts you need

create or open these accounts:

- vercel: deploys admin, landing, and web app.
- stripe: stores products, prices, customers, subscriptions, and payments.
- supabase: stores user accounts, chart profiles, journal entries, clients, reports, and plan access.

## 2. stripe secret key

the stripe secret key is inside your stripe account.

steps:

1. open `https://dashboard.stripe.com/`.
2. switch to live mode if you want real buyers.
3. open `developers`.
4. open `api keys`.
5. copy the `secret key`.
6. production keys start with `sk_live_`.
7. test keys start with `sk_test_`.

put the live key in the admin vercel project as:

```txt
STRIPE_SECRET_KEY=sk_live_your_key_here
```

do not put this key in the landing page. do not put it in client-side code. do not commit it to github.

## 3. admin password

in the admin vercel project, set both:

```txt
DREAMLOGIC_ADMIN_PASSWORD=the password you want to type
DREAMLOGIC_ADMIN_SECRET=a long random private signing secret
```

`DREAMLOGIC_ADMIN_PASSWORD` is the password you enter on the admin login screen.

`DREAMLOGIC_ADMIN_SECRET` is not something you type. it is used by the app to sign the admin session cookie. make it long and random.

example format:

```txt
DREAMLOGIC_ADMIN_SECRET=dl_admin_8dg72hd92h2ks9d7s9d2h3jdh3ks0q
```

## 4. required admin vercel variables

open vercel, choose the `dreamlogic-admin` project, then go to `settings` -> `environment variables`.

add:

```txt
DREAMLOGIC_ADMIN_PASSWORD=your-admin-password
DREAMLOGIC_ADMIN_SECRET=your-long-random-cookie-secret
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
NEXT_PUBLIC_LANDING_URL=https://your-landing-domain
NEXT_PUBLIC_WEBAPP_URL=https://dreamlogic-webapp.vercel.app
NEXT_PUBLIC_ADMIN_URL=https://dreamlogic-admin.vercel.app
```

then redeploy the latest `main` commit.

## 5. stripe products and prices

create these products in stripe:

- free: no stripe checkout needed.
- seeker: 9 usd monthly.
- depth: 19 usd monthly.
- practitioner: 39 usd monthly.
- practice: 89 usd monthly.
- research: 149 usd monthly.

for each paid product:

1. open stripe dashboard.
2. open `product catalog`.
3. create product.
4. add recurring monthly price.
5. copy the price id.

price ids look like:

```txt
price_123abc
```

the web app needs those public price ids when checkout is wired.

## 6. stripe webhooks

in stripe dashboard:

1. open `developers`.
2. open `webhooks`.
3. add endpoint.
4. endpoint should point to the future web app webhook route:

```txt
https://dreamlogic-webapp.vercel.app/api/stripe/webhook
```

listen for:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

copy the webhook signing secret. it starts with `whsec_`.

the web app will need:

```txt
STRIPE_WEBHOOK_SECRET=whsec_your_secret
STRIPE_PRICE_SEEKER=price_your_seeker_price
STRIPE_PRICE_DEPTH=price_your_depth_price
STRIPE_PRICE_PRACTITIONER=price_your_practitioner_price
STRIPE_PRICE_PRACTICE=price_your_practice_price
STRIPE_PRICE_RESEARCH=price_your_research_price
```

## 7. supabase database

create the database:

1. open `https://supabase.com/dashboard`.
2. create a new project.
3. save the database password somewhere private.
4. open `sql editor`.
5. run the SQL migration in this repo:

```txt
supabase/migrations/202607120001_initial_foundation.sql
```

then open `project settings` -> `api` and copy:

- project url
- anon public key
- service role key

the service role key is private. only server routes/admin should use it.

## 8. required web app database variables

in the web app vercel project, add:

```txt
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-private-service-role-key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_SEEKER=price_your_seeker_price
STRIPE_PRICE_DEPTH=price_your_depth_price
STRIPE_PRICE_PRACTITIONER=price_your_practitioner_price
STRIPE_PRICE_PRACTICE=price_your_practice_price
STRIPE_PRICE_RESEARCH=price_your_research_price
NEXT_PUBLIC_LANDING_URL=https://your-landing-domain
```

## 9. required landing variables

in the landing page vercel project, add:

```txt
NEXT_PUBLIC_WEBAPP_URL=https://dreamlogic-webapp.vercel.app
```

the landing page should not receive stripe secret keys, supabase service role keys, or admin secrets.

## 10. analytics

vercel analytics is already installed on the landing page and web app.

to view analytics:

1. open vercel.
2. choose the project.
3. open `analytics`.

check these surfaces separately:

- landing page: visits, CTA clicks, pricing interest.
- web app: workspace visits, chart starts, report preparation.
- admin: private operational use only.

## 11. what is already wired

this admin already reads stripe customers, subscriptions, payments, active subscriptions, monthly recurring value, and paid volume when `STRIPE_SECRET_KEY` is set.

## 12. what still needs credentials before it can be live

these need the private provider values to work live:

- supabase account storage.
- user chart persistence.
- journal persistence.
- client records.
- report history.
- admin user lookup from the database.

once the keys above are in vercel, those server routes can be connected without exposing secrets in the browser.
