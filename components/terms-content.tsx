const TermsEN = () => (
    <div className="space-y-4 text-base ">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p>
            These Terms of Service govern your use of the MOE Agency website and
            services. By accessing our platform, you agree to these terms.
        </p>

        <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
        <p>
            You must agree to these terms to use our services. If you disagree,
            please do not use the website.
        </p>

        <h2 className="text-xl font-semibold">2. User Conduct</h2>
        <p>
            Users must not misuse the platform, post harmful content, or violate
            any applicable laws.
        </p>

        <h2 className="text-xl font-semibold">3. Intellectual Property</h2>
        <p>
            All content and branding on this site belong to MOE Agency.
            Unauthorized use is prohibited.
        </p>

        <h2 className="text-xl font-semibold">4. Termination</h2>
        <p>We may suspend or terminate access if terms are violated.</p>

        <h2 className="text-xl font-semibold">5. Disclaimer</h2>
        <p>
            The services are provided "as is". We do not guarantee error-free or
            uninterrupted access.
        </p>

        <h2 className="text-xl font-semibold">6. Contact</h2>
        <p>If you have any questions, contact us at: support@moeagency.net</p>
    </div>
);

const TermsAR = () => (
    <div className="space-y-4 text-base text-right">
        <h1 className="text-3xl font-bold">شروط الخدمة</h1>
        <p>
            تحكم شروط الخدمة هذه استخدامك لموقع وخدمات MOE Agency. باستخدامك
            لمنصتنا، فإنك توافق على هذه الشروط.
        </p>

        <h2 className="text-xl font-semibold">١. قبول الشروط</h2>
        <p>
            يجب أن توافق على هذه الشروط لاستخدام خدماتنا. إذا كنت لا توافق، يرجى
            عدم استخدام الموقع.
        </p>

        <h2 className="text-xl font-semibold">٢. سلوك المستخدم</h2>
        <p>
            يجب على المستخدمين عدم إساءة استخدام المنصة، أو نشر محتوى ضار، أو
            انتهاك القوانين المعمول بها.
        </p>

        <h2 className="text-xl font-semibold">٣. الملكية الفكرية</h2>
        <p>
            جميع المحتويات والعلامات التجارية في هذا الموقع مملوكة MOE Agency.
            يمنع الاستخدام غير المصرح به.
        </p>

        <h2 className="text-xl font-semibold">٤. إنهاء الخدمة</h2>
        <p>يحق لنا تعليق أو إنهاء الوصول في حال خرق الشروط.</p>

        <h2 className="text-xl font-semibold">٥. إخلاء المسؤولية</h2>
        <p>تُقدّم الخدمات "كما هي"، ولا نضمن خلوها من الأخطاء أو التوقفات.</p>

        <h2 className="text-xl font-semibold">٦. تواصل معنا</h2>
        <p>للاستفسارات، راسلنا على: support@moeagency.com</p>
    </div>
);

export const TermsContent = ({ lang }: { lang: "en" | "ar" }) => {
    return lang === "ar" ? <TermsAR /> : <TermsEN />;
};
