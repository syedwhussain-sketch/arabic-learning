import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BuildingBlock } from '../data/buildingBlocks';
import { getBlockById } from '../data/buildingBlocks';

interface BuildingBlocksState {
  selectedBlock: BuildingBlock | null;
  modalOpen: boolean;
  doneBlocks: Set<string>;

  // Actions
  setSelectedBlock: (block: BuildingBlock | null) => void;
  setModalOpen: (open: boolean) => void;
  handleBlockClick: (blockId: string) => void;
  handleCloseModal: () => void;
  toggleDone: (blockId: string) => void;
}

export const useBuildingBlocksStore = create<BuildingBlocksState>()(
  persist(
    (set, get) => ({
      selectedBlock: null,
      modalOpen: false,
      doneBlocks: new Set<string>(),

      setSelectedBlock: (block) => set({ selectedBlock: block }),
      setModalOpen: (open) => set({ modalOpen: open }),

      handleBlockClick: (blockId) => {
        const block = getBlockById(blockId);
        if (block) {
          set({
            selectedBlock: block,
            modalOpen: true,
          });
        }
      },

      handleCloseModal: () => {
        set({ modalOpen: false });
      },

      toggleDone: (blockId) => {
        const { doneBlocks } = get();
        const newDoneBlocks = new Set(doneBlocks);
        if (newDoneBlocks.has(blockId)) {
          newDoneBlocks.delete(blockId);
        } else {
          newDoneBlocks.add(blockId);
        }
        set({ doneBlocks: newDoneBlocks });
      },
    }),
    {
      name: 'building-blocks-done',
      partialize: (state) => ({ doneBlocks: Array.from(state.doneBlocks) }),
      merge: (persisted: any, current) => ({
        ...current,
        doneBlocks: new Set(persisted?.doneBlocks || []),
      }),
    }
  )
);
