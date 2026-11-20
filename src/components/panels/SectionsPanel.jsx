import { useState } from 'react';
import { GripVertical, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import { SECTION_KEYS } from '../../lib/animations';

export default function SectionsPanel({ data, update }) {
  const sectionsOrder = (data.sectionsOrder || []).filter((s) => s !== 'schedule');
  const visibility = data.sectionVisibility || {};

  const [draggedIdx, setDraggedIdx] = useState(null);

  const getLabel = (id) => {
    const found = SECTION_KEYS.find((s) => s.id === id);
    if (found) return found.label;
    if (id.startsWith('event_')) {
      const ev = (data.separateEvents && data.separateEvents[id]) || {};
      return `✦ ${ev.badge || ev.name || id.replace('event_', '').toUpperCase()}`;
    }
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  function move(index, dir) {
    const targetIdx = index + dir;
    if (targetIdx < 0 || targetIdx >= sectionsOrder.length) return;
    const newOrder = [...sectionsOrder];
    const [item] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, item);
    update('sectionsOrder', newOrder);
  }

  function toggleVisibility(id) {
    update('sectionVisibility', {
      ...visibility,
      [id]: visibility[id] === false ? true : false,
    });
  }

  // HTML5 Drag and Drop handlers
  function handleDragStart(idx) {
    setDraggedIdx(idx);
  }

  function handleDragOver(e, idx) {
    e.preventDefault();
  }

  function handleDrop(e, targetIdx) {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    const newOrder = [...sectionsOrder];
    const [moved] = newOrder.splice(draggedIdx, 1);
    newOrder.splice(targetIdx, 0, moved);
    update('sectionsOrder', newOrder);
    setDraggedIdx(null);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-stone-100 p-3 text-xs text-stone-600 leading-relaxed border border-stone-200">
        <p className="font-semibold text-stone-800 mb-1">Drag & Drop Section Organizer</p>
        Drag items or use the arrows to change the vertical layout order. Toggle the eye icon to show or hide any section.
      </div>

      <div className="space-y-2">
        {sectionsOrder.map((secId, index) => {
          const isVisible = visibility[secId] !== false;
          const isDragging = draggedIdx === index;

          return (
            <div
              key={secId}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-grab active:cursor-grabbing ${
                isDragging
                  ? 'border-dashed border-stone-400 bg-stone-100 opacity-50'
                  : 'border-stone-200 bg-white hover:border-stone-400 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <GripVertical size={16} className="text-stone-400 hover:text-stone-600 cursor-grab" />
                <span
                  className={`text-sm font-medium ${
                    isVisible ? 'text-stone-800' : 'text-stone-400 line-through'
                  }`}
                >
                  {getLabel(secId)}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 hover:bg-stone-100 rounded"
                  title="Move Up"
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === sectionsOrder.length - 1}
                  className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 hover:bg-stone-100 rounded"
                  title="Move Down"
                >
                  <ArrowDown size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => toggleVisibility(secId)}
                  className={`p-1 rounded transition ${
                    isVisible ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100' : 'text-stone-300 hover:text-stone-500'
                  }`}
                  title={isVisible ? 'Hide Section' : 'Show Section'}
                >
                  {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
