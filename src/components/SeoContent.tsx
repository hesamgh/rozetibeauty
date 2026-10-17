import { SITE, SERVICES, FAQ_ITEMS } from "@/lib/data";
import { PhoneNumbers } from "@/components/PhoneNumber";

export default function SeoContent() {
  return (
    <section className="sr-only" aria-label="اطلاعات سالن زیبایی رزتی">
      <h2>سالن زیبایی رزتی — آرایشگاه زنانه میدان آرژانتین تهران</h2>
      <p>
        وب‌سایت رسمی سالن زیبایی رزتی:{" "}
        <a href={SITE.url}>https://rozetibeauty.ir</a>. {SITE.name} واقع در{" "}
        {SITE.address} با مختصات جغرافیایی {SITE.coordinates.lat}،{" "}
        {SITE.coordinates.lng} ارائه‌دهنده خدمات میکاپ و گریم حرفه‌ای، کاشت ناخن،
        اپیلاسیون، خدمات عروس و مراقبت پوست در مناطق {SITE.areas.join("، ")}{" "}
        تهران است. آخرین به‌روزرسانی اطلاعات: {SITE.dateModified}.
      </p>

      <h3>ساعات کاری سالن زیبایی رزتی</h3>
      <ul>
        {SITE.hours.map((h) => (
          <li key={h.days}>
            {h.days}: {h.time}
          </li>
        ))}
      </ul>

      <h3>تماس و رزرو نوبت</h3>
      <p>
        برای رزرو نوبت با شماره‌های <PhoneNumbers /> تماس بگیرید. اینستاگرام:{" "}
        <a href={SITE.instagram}>instagram.com/rozetibeauty</a>. مسیر روی نقشه:{" "}
        <a href={SITE.maps.google}>Google Maps — سالن زیبایی رزتی</a> و{" "}
        <a href={SITE.maps.neshan}>نشان — سالن زیبایی رزتی</a>.
      </p>

      <h3>خدمات سالن زیبایی رزتی در میدان آرژانتین</h3>
      <ul>
        {SERVICES.map((s) => (
          <li key={s.id}>
            {s.title}: {s.description}
          </li>
        ))}
      </ul>

      <h3>مناطق تحت پوشش</h3>
      <p>
        سالن زیبایی رزتی خدمات خود را به مشتریان ساکن{" "}
        {SITE.areas.join("، ")} و اطراف میدان آرژانتین تهران ارائه می‌دهد. دسترسی
        آسان روبروی بیمارستان کسری، ابتدای خیابان الوند.
      </p>

      <h3>سوالات متداول</h3>
      <dl>
        {FAQ_ITEMS.map((item) => (
          <div key={item.question}>
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
