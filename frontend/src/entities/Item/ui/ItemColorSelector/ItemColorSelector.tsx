import React, { useState } from 'react';
import Colors, { ColorsPosition } from '../../../../shared/ui/Colors/Colors';
import { Color } from '../../../../types/data';
import ItemColorSelectorModal from '../ItemColorSelectorModal/ItemColorSelectorModal';

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
      <Colors
        leatherColor={leatherColor}
        threadColor={threadColor}
        position={ColorsPosition.VERTICAL}
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
