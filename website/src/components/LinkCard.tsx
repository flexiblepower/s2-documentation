import React from "react";
import ChevronRightIcon from '@iconify-react/mdi/chevron-right';
import ExternalLinkIcon from '@iconify-react/mdi/external-link';
import Link from "@docusaurus/Link";
interface LinkCardProps {
  title: string;
  description?: string;
  href: string;
  icon?: React.ReactNode;
  category?: string;
}

function linkIcon(href: string){
  return href.startsWith("http") ? 
            <ExternalLinkIcon className="h-6 text-(--ifm-color-primary)" />
          :
          <ChevronRightIcon
            className="h-8 text-(--ifm-color-primary) transition-transform group-hover:translate-x-1"
          />
         
}

export default function LinkCardMD({
  title,
  description,
  href,
  icon,
  category,
}: LinkCardProps) {
  return (
    <Link
      to={href}
      style={{ textDecoration: "none" }}
      className="group block overflow-hidden rounded-3xl border border-transparent bg-(--ifm-card-background-color) p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-(--ifm-color-primary) focus:ring-2 focus:ring-(--ifm-color-primary) focus:outline-none"
    >
      <div className="min-w-0 flex-1">
        {category && (
          <div className="mb-2 text-xs font-medium tracking-wide text-(--ifm-color-primary) uppercase">
            {category}
          </div>
        )}

        <div className="flex items-center gap-2">
          {icon && (
            <div className="h-12 w-12 shrink-0 justify-center rounded-2xl p-1">
              {icon}
            </div>
          )}
          <div className="align-middle w-full text-xl font-semibold text-(--ifm-font-color-base) ">
            {title}
          </div>
          {linkIcon(href)}
        </div>

        {description && (
          <div className="mt-2 line-clamp-2 text-sm text-(--ifm-color-emphasis-700)">
            {description}
          </div>
        )}
      </div>
    </Link>
  );
}
