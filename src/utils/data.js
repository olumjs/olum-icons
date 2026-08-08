import { icons } from "./imports.js";
// The cartesian charts stay monochrome so the gallery reads as one surface
// rather than a colour swatch page; the donut is the one place a palette
// actually carries meaning (one slice per source).
// Both series are labelled off the current date rather than frozen months, so
// a chart captioned "last 6 months" still says something true a year from now.
const lastMonths = (count, offset = 0) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - offset - (count - 1 - i), 1);
    return d.toLocaleString("en-US", { month: "short" });
  });
};

export const nextMonth = (() => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1).toLocaleString("en-US", { month: "long", year: "numeric" });
})();

export const contributions = lastMonths(6).map((month, i) => ({ month, amount: [320, 610, 480, 720, 415, 560][i] }));

export const contributionConfig = { amount: { label: "Contributions", color: "var(--olum-foreground)" } };

export const visitors = lastMonths(6).map((month, i) => ({ month, visitors: [186, 245, 207, 296, 254, 318][i] }));

export const visitorConfig = { visitors: { label: "Visitors", color: "var(--olum-muted-foreground)" } };

export const sources = [
  { name: "Direct", value: 275, color: "var(--color-chart-1)" },
  { name: "Search", value: 200, color: "var(--color-chart-2)" },
  { name: "Social", value: 187, color: "var(--color-chart-3)" },
  { name: "Referral", value: 96, color: "var(--color-chart-4)" },
];

export const planning = [
  { label: "Documents", icon: icons.file },
  { label: "Budget", icon: icons.wallet },
  { label: "Reports", icon: icons.chart },
  { label: "Goals", icon: icons.target },
  { label: "Calendar", icon: icons.calendar },
];

export const support = [
  { label: "Help Center", icon: icons.help },
  { label: "Docs", icon: icons.book },
  { label: "Contact Us", icon: icons.mail },
  { label: "Status", icon: icons.activity },
  { label: "Community", icon: icons.users },
];

export const overview = [
  { label: "Analytics", icon: icons.chart, variant: "muted" },
  { label: "Transactions", icon: icons.swap, variant: "default" },
  { label: "Investments", icon: icons.trending, variant: "default" },
  { label: "Accounts", icon: icons.bank, variant: "default" },
  { label: "Spending", icon: icons.coins, variant: "default" },
];

export const account = [
  { label: "Profile", icon: icons.user, variant: "default" },
  { label: "Billing", icon: icons.card, variant: "muted" },
  { label: "Notifications", icon: icons.bell, variant: "default" },
  { label: "Security", icon: icons.shield, variant: "default" },
  { label: "Appearance", icon: icons.palette, variant: "default" },
];

export const alerts = [
  { id: "n-tx", title: "Transaction alerts", desc: "Deposits, withdrawals, and transfers.", on: true },
  { id: "n-sec", title: "Security alerts", desc: "Login attempts and account changes.", on: true },
  { id: "n-goal", title: "Goal milestones", desc: "Updates at 25%, 50%, 75%, and 100%.", on: false },
  { id: "n-market", title: "Market updates", desc: "Daily portfolio summary and price alerts.", on: false },
];

export const targets = [
  { label: "Retirement", amount: "$42,000 of $60,000", value: 70 },
  { label: "Emergency fund", amount: "$9,600 of $12,000", value: 80 },
  { label: "New car", amount: "$4,150 of $15,000", value: 28 },
];

export const royalties = [
  { label: "Net Royalties", amount: "$1,248.75" },
  { label: "Processing Fee", amount: "-$37.46" },
];

export const faq = [
  { q: "Is it accessible?", a: "Every component ships with the roles, labels, and keyboard behaviour of its shadcn counterpart." },
  { q: "Is it styled?", a: "Yes — the same Tailwind tokens drive light and dark mode across the whole set." },
  { q: "Can I own the code?", a: "Copy the component folder into your project and edit it. There is no runtime to upgrade around." },
];

export const files = [
  { name: "q3-report.pdf", meta: "2.4 MB", state: "done", icon: icons.file },
  { name: "launch-video.mp4", meta: "Uploading…", state: "uploading", icon: null },
  { name: "assets.zip", meta: "Upload failed", state: "error", icon: icons.file },
];

export const activity = [
  { text: "Ada approved the Q3 budget", icon: icons.check },
  { text: "Payment of $1,248.75 cleared", icon: icons.coins },
  { text: "New device linked from Cairo", icon: icons.shield },
  { text: "Goal “New car” reached 28%", icon: icons.target },
  { text: "Report exported to CSV", icon: icons.file },
  { text: "Jane commented on the roadmap", icon: icons.users },
  { text: "Release v1.4.0 published", icon: icons.rocket },
];

export const chat = [
  { id: "m1", align: "start", text: "Hey, do you have the Q3 report ready?" },
  { id: "m2", align: "end", text: "Almost — just polishing the charts now." },
  { id: "m3", align: "start", text: "No rush, end of day is fine." },
  { id: "m4", align: "end", text: "Sounds good, I'll ping you when it's up." },
];

export const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];

export const payments = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  { id: "489e1d42", amount: 125, status: "processing", email: "ada@example.com" },
  { id: "5c3e1d42", amount: 250, status: "success", email: "jane@example.com" },
  { id: "8f2e1d42", amount: 75, status: "failed", email: "john@example.com" },
  { id: "1a2b3c4d", amount: 300, status: "success", email: "alex@example.com" },
  { id: "9d8f7a61", amount: 180, status: "pending", email: "emma@example.com" },
];

export const paymentColumns = [
  { key: "status", label: "Status", cellClass: "capitalize" },
  { key: "amount", label: "Amount", format: "currency", sortable: true, headClass: "text-right", cellClass: "text-right font-medium" },
];

export const toasts = {
  "toast:default": { title: "Event created", description: "Monday, Jan 5 at 4:00pm" },
  "toast:success": { title: "Saved successfully", type: "success" },
  "toast:error": { title: "Something went wrong", type: "error" },
  "toast:warning": { title: "Low disk space", type: "warning" },
};

// Ghost columns flanking the gallery -- pure scenery, so the heights are just
// a list rather than anything derived from real content.
export const ghosts = [140, 96, 210, 120, 168, 88, 190];

// Every nav Item is a pointer target, which Item only styles for real anchors.
export const navItem = "cursor-pointer hover:bg-muted";

// Card is overflow-hidden (it clips a leading <img> to its rounded corners),
// which also clips any overlay that positions itself inline rather than
// through portal.js -- Select, Popover, HoverCard, Tooltip, Combobox,
// DatePicker, NavigationMenu, DropdownMenu/Menubar/ContextMenu all do. Cards
// hosting one opt back out; Dialog/Sheet/Drawer/AlertDialog portal to <body>
// and are unaffected.
export const overlayCard = "overflow-visible";

// Overlay triggers (Dialog/Sheet/Drawer/Popover/DropdownMenu) render their own
// bare <button>, so the button look has to come from the trigger's class.
export const trigger =
  "inline-flex h-8 w-full cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium whitespace-nowrap transition-colors outline-none select-none hover:bg-muted";
