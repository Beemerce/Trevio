import Image from 'next/image';

/** Trevio lockup: ribbon mark + spaced wordmark. On dark backgrounds the wordmark switches to white. */
export function Logo({ onDark = false, priority = false }: { onDark?: boolean; priority?: boolean }) {
  return (
    <>
      <Image src="/brand/trevio-mark.png" alt="" width={30} height={38} priority={priority} style={{ display: 'block', width: 30, height: 'auto' }} />
      <Image
        src={onDark ? '/brand/trevio-wordmark-white.png' : '/brand/trevio-wordmark.png'}
        alt="Trevio"
        width={88}
        height={16}
        priority={priority}
        style={{ display: 'block', width: 88, height: 'auto' }}
      />
    </>
  );
}
