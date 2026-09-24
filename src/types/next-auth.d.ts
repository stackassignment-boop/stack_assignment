// Module augmentation for NextAuth v4.
//
// The session callback in src/app/api/auth/[...nextauth]/route.ts writes `id`
// and `role` onto the session user, and the jwt callback puts them on the
// token. NextAuth's own types know about neither, so every one of those
// assignments was a type error and `session.user` was treated as possibly
// undefined. Declaring the real shape here is the fix NextAuth documents; it
// emits no JavaScript and changes no behaviour, it just tells the compiler what
// the callbacks already do.
//
// Anything read off `session.user` elsewhere in the app (role checks in the
// admin routes, the student dashboard) is now checked against this shape too,
// so a typo in a role field becomes a compile error instead of `undefined`.

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    // Non-optional: the session callback always populates it.
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
    picture?: string | null;
  }
}
