import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function login(formData: FormData) {
  "use server";
  const password = formData.get("password") as string;
  if (password === process.env.SITE_PASSWORD) {
    (await cookies()).set("site-auth", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90, // 90 days
    });
    const from = (formData.get("from") as string) || "/cours";
    redirect(from);
  }
  redirect("/login?error=1");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const { from, error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-6 py-32">
      <h1 className="mb-2 text-2xl font-bold tracking-tight">Acces restreint</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Entre le mot de passe pour acceder aux cours.
      </p>
      <form action={login} className="space-y-4">
        <input type="hidden" name="from" value={from ?? "/cours"} />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          autoFocus
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {error && (
          <p className="text-sm text-red-500">Mot de passe incorrect.</p>
        )}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
        >
          Entrer
        </button>
      </form>
    </div>
  );
}
