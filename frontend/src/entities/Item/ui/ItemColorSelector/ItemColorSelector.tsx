import React, { useState } from 'react';
import ItemColorSelectorModal from '../ItemColorSelectorModal/ItemColorSelectorModal';
import ItemColors from '../ItemColors/ItemColors';
import { Color } from '../../model/types/item';

export enum ItemPart {
  LEATHER = 'leather',
  THREAD = 'thread',
}

interface ItemColorSelectorProps {
  setLeatherColor: (arg: Color) => void;
  setThreadColor: (arg: Color) => void;
  leatherColor: Color;
  threadColor: Color;
}

const ItemColorSelector: React.FC<ItemColorSelectorProps> = ({
  setLeatherColor,
  setThreadColor,
  leatherColor,
  threadColor,
}) => {
  const [isLeatherColorSelectorOpen, setIsLeatherColorSelectorOpen] =
    useState(false);
  const [isThreadColorSelectorOpen, sethIsThreadColorSelectorOpen] =
    useState(false);

  return (
    <>
      <ItemColors
        leatherColor={leatherColor}
        threadColor={threadColor}
        openSelectLeatherColor={() => setIsLeatherColorSelectorOpen(true)}
        openSelectThreadsColor={() => sethIsThreadColorSelectorOpen(true)}
      />

      {isLeatherColorSelectorOpen && (
        <ItemColorSelectorModal
          title="Select leather color"
          setColor={setLeatherColor}
          isOpen={isLeatherColorSelectorOpen}
          onClose={() => setIsLeatherColorSelectorOpen(false)}
          selectedColor={leatherColor}
        />
      )}

      {isThreadColorSelectorOpen && (
        <ItemColorSelectorModal
          title="Select thread color"
          setColor={setThreadColor}
          isOpen={isLeatherColorSelectorOpen}
          onClose={() => sethIsThreadColorSelectorOpen(false)}
          selectedColor={threadColor}
        />
      )}
    </>
  );
};

export default ItemColorSelector;
