import { useAtomValue, useSetAtom } from 'jotai';

import { modalAtom, updateModal } from '@/shared/atom';
import { ModalItem } from '@/shared/types';

export default function useModal() {
  const modal = useAtomValue(modalAtom);
  const setModal = useSetAtom(updateModal);

  const modalState = (key: ModalItem) => modal[key] || { isOpen: false };
  const openModal = (key: ModalItem) => setModal({ key: key, isOpen: true });
  const closeModal = (key: ModalItem) => setModal({ key: key, isOpen: false });

  return { modalState, openModal, closeModal };
}
