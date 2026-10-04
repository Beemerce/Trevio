/** Stand-in logo from the designs: gradient "t" tile + gradient wordmark. Swap for the real logo files when available. */
export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <>
      <span style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--grad-icon)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18, boxShadow: onDark ? undefined : '0 6px 16px -6px rgba(131,120,255,0.7)' }}>t</span>
      <span style={onDark
        ? { fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em', color: '#fff' }
        : { fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em', background: 'linear-gradient(90deg,#5B247A,#1BCECF)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
        trevio
      </span>
    </>
  );
}
