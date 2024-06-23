import React from 'react';
import { useRouter } from 'next/router';
import { Inventory } from '../../../components/Inventory';

export default function InventoryPage() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  return (
    <Inventory characterId={firebaseKey} />
  );
}
