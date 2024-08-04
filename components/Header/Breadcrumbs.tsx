import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { copyIdToClipboard } from "@/lib/copyToClipboard";
import { ChevronRight, FileText, House } from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import useDocumentTitles from "@/hooks/useDocumentTitle"; // Adjust the import path as needed

// Define an interface for the title objects
interface Title {
  id: string;
  title: string;
}

// Breadcrumbs component
function Breadcrumbs() {
  const path = usePathname();
  const segments = path.split("/").filter(Boolean);

  // Use custom hook to get titles
  const titles: Title[] = useDocumentTitles(segments);

  return (
    <>
      {path !== "/" && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <House />
              </BreadcrumbLink>
            </BreadcrumbItem>

            {titles.map(({ id, title }, index) => {
              const isLast = index === segments.length - 1;

              return (
                <Fragment key={id}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage
                        className="cursor-pointer font-bold flex items-center justify-center space-x-4"
                        title="Click to copy ID"
                        onClick={() => copyIdToClipboard(id)}
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <div className="flex items-center justify-center space-x-2 border border-gray-400 rounded-lg p-1 px-2">
                          <FileText className="mr-4" />
                          {title}
                        </div>
                      </BreadcrumbPage>
                    ) : null}
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </>
  );
}

export default Breadcrumbs;
