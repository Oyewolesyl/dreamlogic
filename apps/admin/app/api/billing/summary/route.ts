import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ADMIN_COOKIE, adminToken } from "../../../adminAuth";

export async function GET() {
  const token = adminToken();
  const cookieStore = await cookies();
  const isAuthed = Boolean(token) && cookieStore.get(ADMIN_COOKIE)?.value === token;

  if (!isAuthed) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({
      connected: false,
      currency: "usd",
      customers: [],
      subscriptions: [],
      payments: [],
      totals: {
        customers: 0,
        activeSubscriptions: 0,
        monthlyRecurring: 0,
        paidVolume: 0
      }
    });
  }

  const stripe = new Stripe(stripeKey);
  const [customers, subscriptions, payments] = await Promise.all([
    stripe.customers.list({ limit: 20 }),
    stripe.subscriptions.list({ limit: 20, status: "all", expand: ["data.items.data.price"] }),
    stripe.paymentIntents.list({ limit: 20 })
  ]);

  const activeSubscriptions = subscriptions.data.filter((subscription) => subscription.status === "active");
  const monthlyRecurring = activeSubscriptions.reduce((sum, subscription) => {
    return sum + subscription.items.data.reduce((itemSum, item) => itemSum + ((item.price.unit_amount ?? 0) * (item.quantity ?? 1)), 0);
  }, 0);
  const paidVolume = payments.data
    .filter((payment) => payment.status === "succeeded")
    .reduce((sum, payment) => sum + payment.amount_received, 0);

  return NextResponse.json({
    connected: true,
    currency: "usd",
    customers: customers.data.map((customer) => ({
      id: customer.id,
      name: customer.name ?? "unnamed customer",
      email: customer.email ?? "no email",
      created: customer.created
    })),
    subscriptions: subscriptions.data.map((subscription) => ({
      id: subscription.id,
      customer: typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id,
      status: subscription.status,
      created: subscription.created,
      currentPeriodEnd: subscription.items.data[0]?.current_period_end ?? null,
      amount: subscription.items.data.reduce((sum, item) => sum + ((item.price.unit_amount ?? 0) * (item.quantity ?? 1)), 0),
      interval: subscription.items.data[0]?.price.recurring?.interval ?? "once"
    })),
    payments: payments.data.map((payment) => ({
      id: payment.id,
      status: payment.status,
      amount: payment.amount_received,
      created: payment.created,
      customer: typeof payment.customer === "string" ? payment.customer : payment.customer?.id ?? "no customer"
    })),
    totals: {
      customers: customers.data.length,
      activeSubscriptions: activeSubscriptions.length,
      monthlyRecurring,
      paidVolume
    }
  });
}
