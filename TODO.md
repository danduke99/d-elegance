# TODO

## Build Admin Section

- [ ] Review the current app structure before editing.
  - Inspect routes/pages, layout components, auth/session handling, API/data-access patterns, and styling conventions.
  - Reuse existing components and helpers wherever possible.

- [ ] Define the admin entry point.
  - Decide the route path, likely `/admin`, unless the app already has a convention.
  - Add navigation only if it fits the existing product flow.
  - Protect the route so non-admin users cannot access it.

- [ ] Implement admin authorization.
  - Find the existing user role/permission model.
  - Add an `admin` role check at the route/server boundary.
  - Make sure unauthorized users get a clear redirect, 403, or existing error pattern.

- [ ] Build the admin dashboard shell.
  - Include a compact admin layout with page title, key sections, and useful empty/loading/error states.
  - Keep styling consistent with the existing design system.
  - Avoid marketing-style layout; this should feel like a working tool.

- [ ] Add the required admin management views.
  - Users: list, search/filter, inspect user details, update role/status if supported.
  - Content or records: expose whatever core objects the product needs admins to review or manage.
  - Settings: include only settings that are backed by real app behavior.

- [ ] Wire data operations safely.
  - Use existing API/server-action/database patterns.
  - Validate inputs server-side.
  - Add confirmation UI for destructive actions.
  - Show success and failure feedback for mutations.

- [ ] Add tests around the risky parts.
  - Authorization checks for admin and non-admin users.
  - Rendering of the admin route.
  - Any mutations that change users, content, or settings.

- [ ] Verify manually before finishing.
  - Run lint/typecheck/tests used by this repo.
  - Start the dev server if this is a frontend app.
  - Check desktop and mobile layouts.
  - Confirm unauthorized access is blocked.

### Notes For Codex

- Start by reading the repo. Do not invent a new admin framework before checking what already exists.
- Keep changes scoped to the admin section and the minimum shared code needed to support it.
- If the data model does not yet support roles/permissions, add the smallest durable version and document any migration or seed data needed.
- If requirements are unclear, implement a sensible first admin dashboard and leave clear TODOs for product-specific admin actions.

## Project Assessment After Scan

- Current shape:
  - Next.js 16 app using React 19, TypeScript, Tailwind CSS v4, shadcn/Radix UI components, lucide icons, and local cart state.
  - Storefront routes exist for home, shop, product detail, cart, checkout, and checkout success.
  - Admin routes already exist for dashboard, login, products, product create/edit, categories, and collections.
  - Product, category, collection, cart, order, payment, and dashboard types are defined in `types/index.ts`.
  - Catalog data is currently mock/static in `lib/data/products.ts`, `lib/data/categories.ts`, and `lib/data/collections.ts`.
  - Supabase, Cloudinary, and Sentoo integrations are scaffolded but not fully connected.

- Verification results:
  - `npx.cmd tsc --noEmit` passes.
  - `npm.cmd run lint` fails because `eslint` is not installed even though the script exists.
  - PowerShell blocks `npm`/`npx` shim scripts directly; use `npm.cmd` and `npx.cmd` on this machine.

## Follow-Up TODOs After Admin Section

- [ ] Decide the package manager and clean up lockfiles.
  - Both `package-lock.json` and `pnpm-lock.yaml` are present.
  - Pick npm or pnpm, then remove the unused lockfile in a deliberate cleanup commit.

- [ ] Fix lint tooling.
  - Add the missing ESLint dependency/config that matches Next.js 16, or update the `lint` script to the repo's chosen linter.
  - Re-run `npm.cmd run lint` after setup.

- [ ] Connect Supabase persistence.
  - Add real database tables for products, product media, product variants, personalization fields, categories, collections, product collections, orders, order items, and admin profiles/roles.
  - Replace mock catalog readers with Supabase queries while keeping the current type contracts stable where possible.
  - Add migrations/seed data so the current demo catalog can be loaded into the database.

- [ ] Replace placeholder admin auth.
  - Remove hard-coded admin credentials and `sessionStorage` authentication.
  - Use Supabase Auth with server-side route protection for `/admin`.
  - Add role checks for admin-only access.

- [ ] Make admin CRUD real.
  - Persist create/edit/delete for products, categories, and collections.
  - Validate all admin mutations server-side with Zod or an equivalent schema.
  - Add delete confirmations and user-facing error states for failed saves.

- [ ] Finish Cloudinary image uploads.
  - Implement real signed upload generation in `app/api/cloudinary/sign/route.ts`.
  - Replace product image URL inputs with an upload flow in admin product create/edit.
  - Store Cloudinary `public_id`, secure URL, resource type, and sort position in product media records.

- [ ] Finish Sentoo checkout.
  - Replace the static Sentoo payment-link flow with real payment session creation.
  - Store order drafts before payment and update order status from verified payment responses/webhooks.
  - Implement webhook signature verification before trusting payment status.
  - Remove the manual "I've Paid" production path or gate it behind an admin-reviewed fallback.

- [ ] Add order management.
  - Create an admin orders section with status filters, customer details, order items, delivery method, payment status, and fulfillment actions.
  - Include statuses for pending payment, paid, confirmed, completed, cancelled, and refunded if needed.

- [ ] Improve cart correctness.
  - Treat product + selected variants + personalization as a unique cart line, not only product ID.
  - Prevent cart quantity from exceeding current stock.
  - Validate required variants and personalization fields before adding to cart.

- [ ] Improve storefront filtering and search.
  - Wire the header search icon to a real search UI or remove it until it is implemented.
  - Support collection filtering in `/shop`; current links like `/shop?collection=best-sellers` are not handled by the shop page.
  - Generate category/collection chips from data instead of hard-coded arrays.

- [ ] Replace missing product imagery.
  - Current mock products reference `/images/products/...`, but those files are not present in `public`.
  - Add real product images or map data to existing placeholders until Cloudinary is live.

- [ ] Fix text encoding issues.
  - Search for mojibake in UI fallbacks and replace it with ASCII-safe text like `-`, or a proper em dash if the file encoding is confirmed.

- [ ] Add tests.
  - Add unit tests for formatting, cart line behavior, data filters, and payment helpers.
  - Add integration tests for checkout/order creation once persistence exists.
  - Add admin authorization tests before treating the admin area as production-ready.

- [ ] Add environment documentation.
  - Expand `README.md` with setup steps, package manager choice, required environment variables, and local development commands.
  - Document Supabase, Cloudinary, Sentoo, WhatsApp, and app URL variables.

- [ ] Production hardening pass.
  - Ensure all checkout and admin mutations happen server-side.
  - Avoid trusting client-side totals, stock, delivery eligibility, or payment state.
  - Add clear loading, empty, and error states where data will become asynchronous.
