export const e2p = (s: string | number) => String(s).replace(/\d/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹"[d]);
export const p2e = (s: string | number) =>
  String(s).replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d) as any);
