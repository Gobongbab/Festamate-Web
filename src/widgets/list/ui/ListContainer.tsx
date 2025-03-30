import React from 'react';

import { ListItem } from '@/shared/ui';

export default function ListContainer() {
  const arr = Array.from({ length: 12 }, (_, i) => i);

  return (
    <>
      {arr.map(a => (
        <ListItem key={a} />
      ))}
    </>
  );
}
