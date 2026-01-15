"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ExerciseFilter = () => {
  const t = useTranslations("FilterBar");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string, param: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <section className="py-8 bg-subtitle">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-4/5 mx-auto lg:max-w-5xl gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col sm:flex-row gap-2 text-foreground/65 items-center text-lg md:text-base">
            <span className="uppercase font-stretch-50% font-medium">
              {t("muscle")}
            </span>
            <select
              onChange={(e) => handleChange(e.target.value, "muscle")}
              defaultValue={searchParams.get("muscle") || "all"}
              className="appearance-none w-40 bg-input ring-1 ring-ring py-1 px-2 rounded-md shadow-sm"
            >
              <option value={"all"}>All</option>
              <option value={"full-body"}>Full body</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 text-foreground/65 items-center text-lg md:text-base">
            <span className="uppercase font-stretch-50% font-medium">
              {t("equipment")}
            </span>
            <select
              onChange={(e) => handleChange(e.target.value, "equipment")}
              defaultValue={searchParams.get("equipment") || "all"}
              className="appearance-none w-40 bg-input ring-1 ring-ring py-1 px-2 rounded-md shadow-sm"
            >
              <option value={"all"}>All</option>
              <option value={"body-weight"}>Body weight</option>
            </select>
          </div>
        </div>
        <div>
          <div className="flex flex-col sm:flex-row gap-2 text-foreground/65 items-center text-lg md:text-base">
            <span className="uppercase font-stretch-50% font-medium">
              {t("order")}
            </span>
            <select
              onChange={(e) => handleChange(e.target.value, "sort")}
              defaultValue={searchParams.get("sort") || "a-z"}
              className="appearance-none w-40 bg-input ring-1 ring-ring py-1 px-2 rounded-md shadow-sm"
            >
              <option value={"a-z"}>A-Z</option>
              <option value={"z-a"}>Z-A</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExerciseFilter;
