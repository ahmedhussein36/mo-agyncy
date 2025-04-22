const PrivacyPolicyEN = () => (
    <div className="space-y-4 text-base">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p>
            At MOE Agency, we are committed to protecting your personal
            information and your right to privacy. This Privacy Policy explains
            what information we collect, how we use it, and what rights you have
            in relation to it.
        </p>

        <h2 className="text-xl font-semibold">1. Information We Collect</h2>
        <p>
            We collect personal information that you provide to us directly,
            such as your name, email, phone number, and social media profiles.
            We also collect data automatically through your usage of our website
            (e.g., IP address, device info).
        </p>

        <h2 className="text-xl font-semibold">
            2. How We Use Your Information
        </h2>
        <p>We use your data to:</p>
        <ul className="list-disc pl-5">
            <li>Provide and improve our services</li>
            <li>Communicate with you</li>
            <li>Respond to inquiries and offer support</li>
            <li>Send marketing emails (with your consent)</li>
            <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold">3. Sharing Your Information</h2>
        <p>
            We do not sell or rent your personal information. We may share data
            with service providers, partners, or authorities when legally
            required.
        </p>

        <h2 className="text-xl font-semibold">4. Cookies and Tracking</h2>
        <p>
            We use cookies to enhance user experience, analyze site traffic, and
            customize content. You can control cookies via your browser
            settings.
        </p>

        <h2 className="text-xl font-semibold">5. Your Rights</h2>
        <p>
            You have the right to access, update, or delete your data. To
            exercise these rights, contact us at: privacy@MOE Agencyeagency.com
        </p>

        <h2 className="text-xl font-semibold">6. Contact Us</h2>
        <p>
            If you have questions or concerns about this policy, email us at:
            contact@moeagency.net
        </p>
    </div>
);

const PrivacyPolicyAR = () => (
    <div className="space-y-4 text-base text-right">
        <h1 className="text-3xl font-bold">سياسة الخصوصية</h1>
        <p>
            في MOE Agency نحن ملتزمون بحماية معلوماتك الشخصية وخصوصيتك. توضح
            سياسة الخصوصية هذه البيانات التي نجمعها، وكيف نستخدمها، وما هي حقوقك
            المتعلقة بها.
        </p>

        <h2 className="text-xl font-semibold">١. المعلومات التي نجمعها</h2>
        <p>
            نقوم بجمع المعلومات الشخصية التي تقدمها لنا بشكل مباشر مثل: الاسم،
            البريد الإلكتروني، رقم الهاتف، وروابط حسابات التواصل الاجتماعي. كما
            نجمع معلومات تلقائية من خلال استخدامك للموقع مثل عنوان IP ومواصفات
            الجهاز.
        </p>

        <h2 className="text-xl font-semibold">٢. كيف نستخدم معلوماتك</h2>
        <p>نستخدم بياناتك من أجل:</p>
        <ul className="list-disc pr-5">
            <li>تقديم وتحسين خدماتنا</li>
            <li>التواصل معك</li>
            <li>الرد على الاستفسارات وتقديم الدعم</li>
            <li>إرسال رسائل تسويقية (بموافقتك)</li>
            <li>الامتثال للالتزامات القانونية</li>
        </ul>

        <h2 className="text-xl font-semibold">٣. مشاركة معلوماتك</h2>
        <p>
            لا نقوم ببيع أو تأجير معلوماتك الشخصية. قد نشارك البيانات مع مزودي
            الخدمات أو الشركاء أو الجهات الرسمية عند الضرورة القانونية.
        </p>

        <h2 className="text-xl font-semibold">
            ٤. ملفات تعريف الارتباط (الكوكيز)
        </h2>
        <p>
            نستخدم ملفات الكوكيز لتحسين تجربة المستخدم، وتحليل حركة الموقع،
            وتخصيص المحتوى. يمكنك التحكم بإعدادات الكوكيز من خلال المتصفح.
        </p>

        <h2 className="text-xl font-semibold">٥. حقوقك</h2>
        <p>
            لك الحق في الوصول إلى بياناتك الشخصية أو تعديلها أو طلب حذفها.
            لممارسة هذه الحقوق، تواصل معنا عبر: contact@moeagency.net
        </p>

        <h2 className="text-xl font-semibold">٦. تواصل معنا</h2>
        <p>
            إذا كان لديك أي استفسارات بخصوص هذه السياسة، راسلنا عبر البريد:
            contact@moeagency.net
        </p>
    </div>
);

export const PolicyContent = ({ lang }: { lang: "en" | "ar" }) => {
    return lang === "ar" ? <PrivacyPolicyAR /> : <PrivacyPolicyEN />;
};
