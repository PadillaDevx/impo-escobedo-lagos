import { useLanguage } from "../../contexts/LanguageContext";

export const BrandMark = ({ className = "" }) => {
    const { t } = useLanguage();
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div
                className="relative shrink-0 w-10 h-10 overflow-hidden rounded-full ring-1 ring-[var(--gold)]/60 transition-transform duration-500 ease-editorial group-hover:scale-105"
                aria-hidden="true"
            >
                <img
                    src={`${process.env.PUBLIC_URL}/images/delfin2.png`}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.classList.add(
                            "bg-[var(--navy-deep)]",
                            "flex",
                            "items-center",
                            "justify-center"
                        );
                        e.currentTarget.parentElement.innerHTML =
                            '<span style="color:var(--gold);font-weight:700;font-size:14px;letter-spacing:0.05em;">IE</span>';
                    }}
                />
            </div>
            <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-semibold tracking-[0.22em] text-[var(--ink)] uppercase">
                    {t("brand.name")}
                </span>
                <span className="text-[9px] tracking-[0.3em] text-[var(--gold)] uppercase mt-0.5">
                    {t("brand.subline")}
                </span>
            </div>
        </div>
    );
};
