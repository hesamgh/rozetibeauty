import { SITE } from "@/lib/data";

export function PhoneNumber({
  display,
  className = "",
}: {
  display: string;
  className?: string;
}) {
  return (
    <span dir="ltr" className={`inline-block unicode-bidi-isolate ${className}`}>
      {display}
    </span>
  );
}

export function PhoneNumbers({
  separator = " و ",
  className = "",
}: {
  separator?: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {SITE.phones.map((phone, index) => (
        <span key={phone.tel}>
          {index > 0 && separator}
          <PhoneNumber display={phone.display} />
        </span>
      ))}
    </span>
  );
}
