import React from "react";
import ChevronRightIcon from '@iconify-react/mdi/chevron-right';
import ExternalLinkIcon from '@iconify-react/mdi/external-link';
import Link from "@docusaurus/Link";
import styles from './LinkCard.module.css';
interface LinkCardProps {
  title: string;
  description?: string;
  href: string;
  icon?: React.ReactNode;
  category?: string;
}

function linkIcon(href: string){
  return href.startsWith("http") ? 
            <ExternalLinkIcon className={styles.externalIcon} />
          :
          <ChevronRightIcon
            className={styles.chevronIcon}
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
      style={{textDecoration: "none"}}
      className={styles.card}
    >
      <div className={styles.content}>
        {category && (
          <div className={styles.category}>
            {category}
          </div>
        )}

        <div className={styles.row}>
          {icon && (
            <div className={styles.iconWrapper}>
              {icon}
            </div>
          )}
          <div className={styles.title}>
            {title}
          </div>
          {linkIcon(href)}
        </div>

        {description && (
          <div className={styles.description}>
            {description}
          </div>
        )}
      </div>
    </Link>
  );
}
