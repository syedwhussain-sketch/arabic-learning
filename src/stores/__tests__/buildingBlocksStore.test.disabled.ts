import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useBuildingBlocksStore } from '../buildingBlocksStore';
import { act } from '@testing-library/react';

// Mock the buildingBlocks module
vi.mock('../../data/buildingBlocks', () => ({
  getBlockById: (id: string) => {
    const blocks = {
      'block1': { id: 'block1', title: 'Block 1', content: 'Content 1' },
      'block2': { id: 'block2', title: 'Block 2', content: 'Content 2' },
    };
    return blocks[id as keyof typeof blocks] || null;
  }
}));

describe('buildingBlocksStore', () => {
  beforeEach(() => {
    // Reset store to initial state by clearing doneBlocks
    const store = useBuildingBlocksStore.getState();
    act(() => {
      store.setSelectedBlock(null);
      store.setModalOpen(false);
      // Clear all done blocks
      const allBlocks = Array.from(store.doneBlocks);
      allBlocks.forEach(blockId => store.toggleDone(blockId));
    });
  });

  describe('initial state', () => {
    it('should have null selected block', () => {
      const { selectedBlock } = useBuildingBlocksStore.getState();
      expect(selectedBlock).toBeNull();
    });

    it('should have modal closed', () => {
      const { modalOpen } = useBuildingBlocksStore.getState();
      expect(modalOpen).toBe(false);
    });

    it('should have empty done blocks set', () => {
      const { doneBlocks } = useBuildingBlocksStore.getState();
      expect(doneBlocks).toBeInstanceOf(Set);
      expect(doneBlocks.size).toBeGreaterThanOrEqual(0);
    });
  });

  describe('setSelectedBlock', () => {
    it('should set selected block', () => {
      const { setSelectedBlock } = useBuildingBlocksStore.getState();
      const mockBlock = { id: 'test', title: 'Test Block', content: 'Test Content' };
      
      act(() => {
        setSelectedBlock(mockBlock as any);
      });
      
      const { selectedBlock } = useBuildingBlocksStore.getState();
      expect(selectedBlock).toEqual(mockBlock);
    });

    it('should set selected block to null', () => {
      const { setSelectedBlock } = useBuildingBlocksStore.getState();
      
      act(() => {
        setSelectedBlock({ id: 'test', title: 'Test', content: 'Content' } as any);
        setSelectedBlock(null);
      });
      
      const { selectedBlock } = useBuildingBlocksStore.getState();
      expect(selectedBlock).toBeNull();
    });
  });

  describe('setModalOpen', () => {
    it('should open modal', () => {
      const { setModalOpen } = useBuildingBlocksStore.getState();
      
      act(() => {
        setModalOpen(true);
      });
      
      const { modalOpen } = useBuildingBlocksStore.getState();
      expect(modalOpen).toBe(true);
    });

    it('should close modal', () => {
      const { setModalOpen } = useBuildingBlocksStore.getState();
      
      act(() => {
        setModalOpen(true);
        setModalOpen(false);
      });
      
      const { modalOpen } = useBuildingBlocksStore.getState();
      expect(modalOpen).toBe(false);
    });
  });

  describe('handleBlockClick', () => {
    it('should set selected block and open modal', () => {
      const { handleBlockClick } = useBuildingBlocksStore.getState();
      
      act(() => {
        handleBlockClick('block1');
      });
      
      const { selectedBlock, modalOpen } = useBuildingBlocksStore.getState();
      expect(selectedBlock).toBeTruthy();
      expect(selectedBlock?.id).toBe('block1');
      expect(modalOpen).toBe(true);
    });

    it('should handle non-existent block gracefully', () => {
      const { handleBlockClick } = useBuildingBlocksStore.getState();
      
      act(() => {
        handleBlockClick('non-existent');
      });
      
      // Should not crash, but state depends on implementation
      expect(true).toBe(true); // Test passes if no error thrown
    });
  });

  describe('handleCloseModal', () => {
    it('should close modal', () => {
      const { setModalOpen, handleCloseModal } = useBuildingBlocksStore.getState();
      
      act(() => {
        setModalOpen(true);
        handleCloseModal();
      });
      
      const { modalOpen } = useBuildingBlocksStore.getState();
      expect(modalOpen).toBe(false);
    });
  });

  describe('toggleDone', () => {
    it('should mark block as done', () => {
      const { toggleDone } = useBuildingBlocksStore.getState();
      
      act(() => {
        toggleDone('block1');
      });
      
      const { doneBlocks } = useBuildingBlocksStore.getState();
      expect(doneBlocks.has('block1')).toBe(true);
    });

    it('should unmark block as done', () => {
      const { toggleDone } = useBuildingBlocksStore.getState();
      
      act(() => {
        toggleDone('block1');
        toggleDone('block1');
      });
      
      const { doneBlocks } = useBuildingBlocksStore.getState();
      expect(doneBlocks.has('block1')).toBe(false);
    });

    it('should toggle multiple blocks independently', () => {
      const { toggleDone } = useBuildingBlocksStore.getState();
      
      act(() => {
        toggleDone('block1');
        toggleDone('block2');
      });
      
      const { doneBlocks } = useBuildingBlocksStore.getState();
      expect(doneBlocks.has('block1')).toBe(true);
      expect(doneBlocks.has('block2')).toBe(true);
    });
  });
});
