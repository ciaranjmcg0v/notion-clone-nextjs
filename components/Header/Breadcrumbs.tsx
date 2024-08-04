import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { db } from "@/firebase";
import { copyIdToClipboard } from "@/lib/copyToClipboard";
import { doc } from "firebase/firestore";
import { ChevronRight, FileText, House } from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

function Breadcrumbs() {
  const path = usePathname();
  const segments = path.split("/");

  const getDocumentTitle = (id: string) => {
    if (!id) return null;
    const [data] = useDocumentData(doc(db, "documents", id));
    // console.log(data);
    const title = data?.title!;
    return title;
  };

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

            {segments.map((segment, index) => {
              if (!segment) return null;
              const isLast = index === segments.length - 1;

              return (
                <Fragment key={segment}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage
                        className="cursor-pointer font-bold flex items-center justify-center space-x-4"
                        title="Click to copy ID"
                        onClick={copyIdToClipboard(segment)}
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <div className="flex items-center justify-center space-x-2 border border-gray-400 rounded-lg p-1 px-2">
                          <FileText className="mr-4" />
                          {getDocumentTitle(segment) ?? segment}
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
