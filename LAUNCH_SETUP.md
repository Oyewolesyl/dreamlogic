# dream logic admin setup

this repo is the private admin dashboard.

## what belongs here

- private admin login.
- buyer and subscription overview.
- stripe customers and payments.
- site links.
- pricing management view.
- analytics links.
- operational checks.

## required vercel variables

open vercel -> admin project -> settings -> environment variables.

add:

```txt
DREAMLOGIC_ADMIN_PASSWORD=the_password_you_want_to_type
DREAMLOGIC_ADMIN_SECRET=a_long_random_private_secret
STRIPE_SECRET_KEY=sk_live_or_sk_test_key_here
NEXT_PUBLIC_LANDING_URL=https://dreamlogic-landingpage.vercel.app
NEXT_PUBLIC_WEBAPP_URL=https://dreamlogic-webapp.vercel.app
NEXT_PUBLIC_ADMIN_URL=https://dreamlogic-admin.vercel.app
```

`DREAMLOGIC_ADMIN_PASSWORD` is what you type on the login screen.

`DREAMLOGIC_ADMIN_SECRET` is not typed anywhere. make it long and random. it signs the private login cookie.

## where to get stripe secret key

1. open `https://dashboard.stripe.com`.
2. click `developers`.
3. click `api keys`.
4. copy `secret key`.
5. use `sk_test_` for testing.
6. use `sk_live_` for real payments.

## test

1. open the admin url.
2. confirm the password screen appears first.
3. type the value from `DREAMLOGIC_ADMIN_PASSWORD`.
4. confirm the dashboard opens.
5. confirm buyers/subscriptions show real stripe data after `STRIPE_SECRET_KEY` is set.
6. confirm landing and web app links open the correct projects.
