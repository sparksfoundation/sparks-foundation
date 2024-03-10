import { NextResponse } from "next/server";

export const rewrites = [];

export const redirects = [
  { subdomain: "linktree", href: `${process.env.ORIGIN}/#links` },
  { subdomain: "links", href: `${process.env.ORIGIN}/#links` },
  { subdomain: "docs", href: 'https://sparks-dao.notion.site/SPARKS-DAO-073cfcc8fe814afaab7073ebd7e6513e' },
  { subdomain: "gitbook", href: "https://sparks-dao.notion.site/SPARKS-DAO-073cfcc8fe814afaab7073ebd7e6513e" },
  { subdomain: "notion", href: "https://sparks-dao.notion.site/SPARKS-DAO-073cfcc8fe814afaab7073ebd7e6513e" },
  { subdomain: "discord", href: "https://discord.com/invite/JuNWR6vGKC" },
  { subdomain: "twitter", href: "https://twitter.com/sparks_dao" },
  { subdomain: "github", href: "https://github.com/sparksfoundation" },
  { subdomain: "telegram", href: "https://t.me/sparks_official" },
  { subdomain: "etherscan", href: "https://etherscan.io/token/0x5f5c86a9f8aaf63ce27b82fab3b33df73cbc3d12" },
  { subdomain: "uniswap", href: "https://app.uniswap.org/#/swap?exactField=input&&outputCurrency=0x5f5c86a9f8aaf63ce27b82fab3b33df73cbc3d12" },
  { subdomain: "dextools", href: "https://www.dextools.io/app/en/ether/pair-explorer/0xdb4a17ee208f7e7e35f6af0ee3cc72e307322821" },
];

export function middleware(req) {
  const subdomain = req.headers.get("host").split(".")[0];
  const redirect = redirects.find((r) => r.subdomain === subdomain);
  if (redirect) return NextResponse.redirect(redirect.href, 308);
  const rewrite = rewrites.find((r) => r.subdomain === subdomain);
  if (rewrite) return NextResponse.rewrite(rewrite.href);
}
