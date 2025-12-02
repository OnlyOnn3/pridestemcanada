"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Breadcrumb.module.css";

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Don't show breadcrumb on homepage
  if (pathname === "/") return null;
  
  const pathSegments = pathname.split("/").filter(segment => segment);
  
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: "Home", path: "/" }
  ];
  
  let currentPath = "";
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Format label
    let label = segment
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    // Special cases
    if (segment === "conference_about") label = "Conference About";
    if (segment === "about" && pathSegments[0] === "conference") label = "About Conference";
    
    breadcrumbItems.push({
      label,
      path: currentPath,
      isLast: index === pathSegments.length - 1
    });
  });
  
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className={styles.breadcrumbItem}>
            {item.isLast ? (
              <span className={styles.breadcrumbCurrent} aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <Link href={item.path} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
                <span className={styles.breadcrumbSeparator}>/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
