import type { TaskKey } from "./site-config";
import type { SitePost } from "./site-connector";

const taskSeeds: Record<TaskKey, string> = {
  listing: "listing",
  classified: "classified",
  article: "article",
  image: "image",
  profile: "profile",
  social: "social",
  pdf: "pdf",
  org: "org",
  sbm: "sbm",
  comment: "comment",
};

const taskTitles: Record<TaskKey, string[]> = {
  listing: [
    "Lunar Node Validator Services",
    "Rocket Custody & Compliance Desk",
    "Orbital OTC Trading Lounge",
    "Nova Chain Analytics Studio",
    "Meteor Pay Merchant Solutions",
  ],
  classified: [
    "Seeking: Solidity Auditor (Remote)",
    "Event Space — Dubai Crypto Week",
    "Used Ledger-Grade Server Rack",
    "Part-Time Community Moderator",
    "Co-Working Desks near BKC",
  ],
  article: [
    "Listing Quality Signals That Actually Convert",
    "How moonrocketcoin.net Structures Business Data",
    "From Classified to Contract: A Field Guide",
    "Risk Disclosures for Token-Adjacent Listings",
    "Operating a Compliant Directory at Scale",
  ],
  image: [
    "Exchange Floor Lighting Study",
    "Conference Keynote Stills",
    "Wallet UX Gallery",
    "Mining Facility Documentation",
    "Brand Refresh Moodboard",
  ],
  profile: [
    "Priya Mehta — Listings Lead",
    "Jordan Ellis — Partnerships",
    "Block Harbor Collective",
    "North Star Compliance",
    "Mira Shah — Editor",
  ],
  social: [
    "Mainnet Upgrade Window",
    "New Listing Review SLA",
    "Community AMA Schedule",
    "Partnership Pipeline Update",
    "Regional Meetup Series",
  ],
  pdf: [
    "Moon Rocket Coin Media Kit",
    "Directory Onboarding Checklist",
    "KYC Lite Playbook",
    "Sponsor Deck Q2",
    "API Field Reference",
  ],
  org: [
    "Moon Rocket Coin Ops",
    "Ledger Harbor Foundation",
    "Orbital Ventures DAO",
    "Crimson Analytics Guild",
    "Pale Star Media",
  ],
  sbm: [
    "Stablecoin Policy Tracker",
    "Wallet Security Resources",
    "On-Chain Analytics Tools",
    "Regulatory Reading List",
    "Listing SEO Notes",
  ],
  comment: [
    "Re: Validator Due Diligence",
    "On Listing Verification Depth",
    "Classified Pricing Norms",
    "Thread: Map Embed Accuracy",
    "Feedback: Search Synonyms",
  ],
};

const taskCategories: Record<TaskKey, string[]> = {
  listing: ["Web3", "Infrastructure", "Trading", "Analytics", "Payments"],
  classified: ["Jobs", "Real Estate", "Hardware", "Gigs", "Market"],
  article: ["Operations", "Compliance", "Product", "Editorial", "Risk"],
  image: ["Events", "Brand", "Product", "Facilities", "Design"],
  profile: ["Leadership", "Partnerships", "Collective", "Advisory", "Editorial"],
  social: ["Updates", "Ops", "Events", "Pipeline", "Community"],
  pdf: ["Media", "Ops", "Compliance", "Sales", "Engineering"],
  org: ["Core", "Foundation", "Ventures", "Guild", "Studio"],
  sbm: ["Research", "Security", "Data", "Policy", "Growth"],
  comment: ["Discussion", "QA", "Feedback", "Debate", "Support"],
};

const summaryByTask: Record<TaskKey, string> = {
  listing: "Verified-style business listing on moonrocketcoin.net with structured contact metadata.",
  classified: "Short-form classified entry reviewed for clarity and fit.",
  article: "Editorial or briefing published on the Moon Rocket Coin domain.",
  image: "Visual story or gallery post.",
  profile: "Public profile with directory-aligned trust cues.",
  social: "Lightweight community or ops update.",
  pdf: "Downloadable asset for partners and operators.",
  org: "Organization surface linked to listings and content.",
  sbm: "Curated external resource saved for the community.",
  comment: "Threaded response with context for readers.",
};

const randomFrom = (items: string[], index: number) =>
  items[index % items.length];

const buildImage = (task: TaskKey, index: number) =>
  `https://picsum.photos/seed/${taskSeeds[task]}-${index}/1200/800`;

export const getMockPostsForTask = (task: TaskKey): SitePost[] => {
  return Array.from({ length: 5 }).map((_, index) => {
    const title = taskTitles[task][index];
    const category = randomFrom(taskCategories[task], index);
    const slug = `${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const baseImages =
      task === "listing" && index % 2 === 0
        ? [
            buildImage(task, index),
            buildImage(task, index + 11),
            buildImage(task, index + 23),
          ]
        : [buildImage(task, index)];

    return {
      id: `${task}-mock-${index + 1}`,
      title,
      slug,
      summary: summaryByTask[task],
      content: {
        type: task,
        category,
        location: index % 2 === 0 ? "Mumbai, India" : "Singapore",
        address:
          index % 2 === 0
            ? "BKC Bandra, Mumbai, Maharashtra"
            : "Raffles Place, Singapore",
        description: summaryByTask[task],
        website: "https://moonrocketcoin.net",
        phone: "+91-22-4000-7000",
        email: `listings${index + 1}@moonrocketcoin.net`,
        images: baseImages,
      },
      media: baseImages.map((url) => ({ url, type: "IMAGE" as const })),
      tags: [task, category],
      authorName: "Moon Rocket Coin Editorial",
      publishedAt: new Date().toISOString(),
    };
  });
};
