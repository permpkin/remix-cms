import type { Page } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Page } from "@prisma/client";

export function getPage({
  id
}: Pick<Page, "id">) {
  return prisma.page.findFirst({
    // select: { id: true, body: true, title: true },
    where: { id },
  });
}

export function accessPage({
  slug
}: Pick<Page, "slug">) {
  return prisma.page.findFirst({
    // get matching slug and where published.
    where: { slug, status: "Published" }
  });
}

export function createPage(pagedata: Page) {
  return prisma.page.create({
    data: pagedata
  });
}

export function deletePage({
  id
}: Pick<Page, "id">) {
  return prisma.page.deleteMany({
    where: { id },
  });
}
